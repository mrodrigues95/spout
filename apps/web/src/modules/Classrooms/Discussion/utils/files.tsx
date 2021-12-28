import { useCallback, useMemo, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import mime from 'mime-types';
import { FileExtension } from '../../../../__generated__/schema.generated';
import {
  GenerateUploadSasMutation as _GenerateUploadSasMutation,
  GenerateUploadSasMutationVariables as _GenerateUploadSasMutationVariables,
  CompleteUploadMutation as _CompleteUploadMutation,
  CompleteUploadMutationVariables as _CompleteUploadMutationVariables,
  DeleteFileMutation as _DeleteFileMutation,
  DeleteFileMutationVariables as _DeleteFileMutationVariables,
} from './__generated__/files.generated';
import { useBlob } from '../../../../shared/hooks/useBlob';
import { generateId } from '@spout/toolkit';

export const MAX_FILES_PER_UPLOAD = 10;
export const MIN_FILE_SIZE = 1;
export const MAX_FILE_SIZE = 8388608; // 8MB (8388608 bytes).

export const getAcceptedFileExtensions = () => {
  let acceptedFileExtensions: string[] = [];

  for (const ext in FileExtension) {
    const prefix = '.';
    const accepted = `${prefix}${ext.toLowerCase()}`;
    acceptedFileExtensions.push(accepted);
  }

  return acceptedFileExtensions;
};

export const getFileExtensionFromContentType = (type: string) => {
  const extension = mime.extension(type);
  if (!extension) return null;

  return extension.toUpperCase() as FileExtension;
};

const units = [
  'bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;
export const formatBytesToHumanReadable = (bytes: number) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (!bytes && '0 bytes') ||
    (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + units[i]
  );
};

const GenerateUploadSASMutation = gql`
  mutation GenerateUploadSASMutation($input: GenerateUploadSASInput!) {
    generateUploadSAS(input: $input) {
      sas
      file {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
`;

const CompleteUploadMutation = gql`
  mutation CompleteUploadMutation($input: CompleteUploadInput!) {
    completeUpload(input: $input) {
      file {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
`;

const DeleteFileMutation = gql`
  mutation DeleteFileMutation($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      file {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
`;

export interface FileWithId extends File {
  id?: string | null;
}

export interface FileUploadQueue {
  id: number;
  file: FileWithId;
  isUploading: boolean;
  isUploaded: boolean;
  isError: boolean;
  isQueued: boolean;
}

export const useFileUploadQueue = () => {
  const blob = useBlob();
  const [isInFlight, setIsInFlight] = useState(false);
  const [fileUploadQueue, setFileUploadQueue] = useState<FileUploadQueue[]>([]);

  const [generateSAS] = useMutation<
    _GenerateUploadSasMutation,
    _GenerateUploadSasMutationVariables
  >(GenerateUploadSASMutation);

  const [completeUpload] = useMutation<
    _CompleteUploadMutation,
    _CompleteUploadMutationVariables
  >(CompleteUploadMutation);

  const [deleteFile] = useMutation<
    _DeleteFileMutation,
    _DeleteFileMutationVariables
  >(DeleteFileMutation);

  const generateSignature = useCallback(async (file: File) => {
    try {
      const { data, errors } = await generateSAS({
        variables: {
          input: {
            fileName: file.name,
            size: file.size,
            mimeType: file.type,
            fileExtension: getFileExtensionFromContentType(file.type)!,
          },
        },
      });

      if (errors || data!.generateUploadSAS.userErrors) {
        return null;
      }

      const { sas, file: _file } = data!.generateUploadSAS!;
      return { sas, fileId: _file!.id };
    } catch (e) {
      console.error(`[Error generating SAS]: ${e}`);
      return null;
    }
  }, []);

  const uploadBlob = useCallback(async (sas: string, file: File) => {
    try {
      return await blob.upload(sas, file);
    } catch (e) {
      return null;
    }
  }, []);

  const updateFile = useCallback(async (fileId: string) => {
    try {
      const { data, errors } = await completeUpload({
        variables: {
          input: {
            fileId,
          },
        },
      });

      if (errors || data!.completeUpload.userErrors) {
        return null;
      }

      const { file } = data!.completeUpload!;
      return file;
    } catch (e) {
      console.error(`[Error updating file]: ${e}`);
      return null;
    }
  }, []);

  const removeFromQueue = useCallback(
    (queueId: number, fileId?: FileWithId['id']) => {
      setFileUploadQueue((prev) => [
        ...prev.filter((item) => item.id !== queueId),
      ]);

      if (fileId) {
        deleteFile({ variables: { input: { fileId } } }).catch((e) =>
          console.error(`[Error deleting file]: ${e}`)
        );
      }
    },
    []
  );

  const resetQueue = useCallback(() => {
    setFileUploadQueue([]);
    setIsInFlight(false);
  }, []);

  // TODO: This can probably be cleaned up with `useReducer`.
  const upload = useCallback(async (files: FileWithId[]) => {
    const queue: FileUploadQueue[] = [];
    for (const file of files) {
      queue.push({
        id: generateId(),
        file,
        isUploading: false,
        isUploaded: false,
        isError: false,
        isQueued: true,
      });
    }

    setIsInFlight(true);
    setFileUploadQueue((prev) => [...prev, ...queue]);

    // Uploading files is a three step process where:
    // 1. A SAS needs to be generated.
    // 2. The SAS then needs to be consumed.
    // 3. A third and final request is made to the api in order to
    //    update the file record in the database and mark the upload as complete.
    for (const entry of queue) {
      // This file has already been handled in a previous transaction, ignore it.
      if (entry.isUploaded || entry.isError || !entry.isQueued) continue;

      const id = entry.id;
      const file = entry.file;

      const status: FileUploadQueue = {
        id,
        file,
        isUploading: true,
        isUploaded: false,
        isError: false,
        isQueued: false,
      };

      setFileUploadQueue((prev) => [
        ...prev.filter((item) => item.id !== id),
        status,
      ]);
      const { sas, fileId } = (await generateSignature(file)) || {};

      if (!sas || !fileId) {
        setFileUploadQueue((prev) => [
          ...prev.filter((item) => item.id !== id),
          {
            ...status,
            isUploading: false,
            isUploaded: false,
            isError: true,
          },
        ]);
        continue;
      }

      await uploadBlob(sas, file);

      const updateFileResult = await updateFile(fileId);
      if (!updateFileResult) {
        setFileUploadQueue((prev) => [
          ...prev.filter((item) => item.id !== id),
          {
            ...status,
            isUploading: false,
            isUploaded: false,
            isError: true,
          },
        ]);
        continue;
      }

      status.file.id = fileId;
      setFileUploadQueue((prev) => [
        ...prev.filter((item) => item.id !== id),
        {
          ...status,
          isUploading: false,
          isUploaded: true,
          isError: false,
        },
      ]);
    }

    setIsInFlight(false);
  }, []);

  const uploadedFiles = useMemo(
    () =>
      [...fileUploadQueue.filter((queue) => queue.isUploaded)].map(
        (queue) => queue.file
      ),
    [fileUploadQueue]
  );

  const errorFiles = useMemo(
    () =>
      [...fileUploadQueue.filter((queue) => queue.isError)].map(
        (queue) => queue.file
      ),
    [fileUploadQueue]
  );

  return {
    upload,
    resetQueue,
    removeFromQueue,
    queue: { isInFlight, files: fileUploadQueue, uploadedFiles, errorFiles },
  };
};
