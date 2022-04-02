import { useCallback, useMemo, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { generateId } from '@spout/toolkit';
import { useFileUpload } from '../../../shared/hooks/files';
import { useToast } from '../../../shared/components';
import { useFileUploadQueueMutation } from './__generated__/useFileUploadQueueMutation.graphql';

const mutation = graphql`
  mutation useFileUploadQueueMutation($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      file {
        id
      }
      errors {
        ... on Error {
          message
        }
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
  const { upload: uploadFile } = useFileUpload();
  const [isInFlight, setIsInFlight] = useState(false);
  const [fileUploadQueue, setFileUploadQueue] = useState<FileUploadQueue[]>([]);
  const { handleError } = useToast();

  const [deleteFile] = useMutation<useFileUploadQueueMutation>(mutation);

  const removeFromQueue = useCallback(
    (queueId: number, fileId?: FileWithId['id']) => {
      setFileUploadQueue((prev) => [
        ...prev.filter((item) => item.id !== queueId),
      ]);

      if (fileId) {
        deleteFile({
          variables: { input: { fileId } },
          onError: () => {
            handleError();
            console.error('Error deleting file for id: ', fileId);
          },
        });
      }
    },
    [deleteFile, handleError],
  );

  const resetQueue = useCallback(() => {
    setFileUploadQueue([]);
    setIsInFlight(false);
  }, []);

  const upload = useCallback(
    async (files: FileWithId[]) => {
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

      // TODO: Figure out slow query times while generating SAS's or look into
      // executing all of these uploads with `Promise.allSettled()`.
      for (const entry of queue) {
        // This file has already been handled in a previous transaction, ignore it.
        if (entry.isUploaded || entry.isError || !entry.isQueued) continue;

        const status: FileUploadQueue = {
          id: entry.id,
          file: entry.file,
          isUploading: true,
          isUploaded: false,
          isError: false,
          isQueued: false,
        };

        setFileUploadQueue((prev) => [
          ...prev.filter((item) => item.id !== entry.id),
          status,
        ]);

        const { id: fileId } = (await uploadFile(entry.file)) || {};

        // Upload failed.
        if (!fileId) {
          setFileUploadQueue((prev) => [
            ...prev.filter((item) => item.id !== entry.id),
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
          ...prev.filter((item) => item.id !== entry.id),
          {
            ...status,
            isUploading: false,
            isUploaded: true,
            isError: false,
          },
        ]);
      }

      setIsInFlight(false);
    },
    [uploadFile],
  );

  const uploadedFiles = useMemo(
    () =>
      [...fileUploadQueue.filter((queue) => queue.isUploaded)].map(
        (queue) => queue.file,
      ),
    [fileUploadQueue],
  );

  const errorFiles = useMemo(
    () =>
      [...fileUploadQueue.filter((queue) => queue.isError)].map(
        (queue) => queue.file,
      ),
    [fileUploadQueue],
  );

  return {
    upload,
    resetQueue,
    removeFromQueue,
    queue: { isInFlight, files: fileUploadQueue, uploadedFiles, errorFiles },
  };
};
