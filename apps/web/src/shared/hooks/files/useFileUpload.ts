import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import { getFileExtensionFromFileName } from '@spout/toolkit';
import { useBlob } from './useBlob';
import { validateWhitelistedExtension } from '../../utils';
import {
  useFileUploadGenerateUploadSASMutation,
  useFileUploadGenerateUploadSASMutation$data,
} from './__generated__/useFileUploadGenerateUploadSASMutation.graphql';
import {
  useFileUploadCompleteUploadMutation,
  useFileUploadCompleteUploadMutation$data,
} from './__generated__/useFileUploadCompleteUploadMutation.graphql';

const GenerateUploadSASMutation = graphql`
  mutation useFileUploadGenerateUploadSASMutation(
    $input: GenerateUploadSASInput!
  ) {
    generateUploadSAS(input: $input) {
      generateSASPayload {
        sas
        file {
          id
          location
          name
          contentLength
          extension
        }
      }
      errors {
        ... on GenerateSignatureError {
          message
        }
        ... on ParseSignatureError {
          message
        }
      }
    }
  }
`;

const CompleteUploadMutation = graphql`
  mutation useFileUploadCompleteUploadMutation($input: CompleteUploadInput!) {
    completeUpload(input: $input) {
      file {
        id
        location
        name
        contentLength
        extension
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;

export const useFileUpload = () => {
  const blob = useBlob();
  const [generate] = useMutation<useFileUploadGenerateUploadSASMutation>(
    GenerateUploadSASMutation,
  );
  const [completeUpload] = useMutation<useFileUploadCompleteUploadMutation>(
    CompleteUploadMutation,
  );

  const generateUploadSAS = useCallback(
    (file: File) => {
      const { ext } = getFileExtensionFromFileName(file.name);
      const whitelistedExt = validateWhitelistedExtension(ext);
      if (!whitelistedExt) return null;

      return new Promise<
        | useFileUploadGenerateUploadSASMutation$data['generateUploadSAS']['generateSASPayload']
        | null
      >((resolve) => {
        generate({
          variables: {
            input: {
              fileName: file.name,
              size: file.size,
              mimeType: file.type,
              fileExtension: whitelistedExt,
            },
          },
          onCompleted: (data) => {
            if (data.generateUploadSAS.errors) resolve(null);

            const { sas, file: _file } =
              data.generateUploadSAS.generateSASPayload!;
            resolve({ sas, file: _file });
          },
          onError: (e) => {
            console.error('[Error generating SAS]: ', e);
            resolve(null);
          },
        });
      });
    },
    [generate],
  );

  const uploadBlob = useCallback(
    async (sas: string, file: File) => {
      try {
        return await blob.upload(sas, file);
      } catch (e) {
        return null;
      }
    },
    [blob],
  );

  const updateFile = useCallback(
    (fileId: string) => {
      return new Promise<
        | useFileUploadCompleteUploadMutation$data['completeUpload']['file']
        | null
      >((resolve) => {
        completeUpload({
          variables: { input: { fileId } },
          onCompleted: (data) => {
            if (data.completeUpload.errors) resolve(null);
            resolve(data.completeUpload.file!);
          },
          onError: (e) => {
            console.error('[Error updating file]: ', e);
            resolve(null);
          },
        });
      });
    },
    [completeUpload],
  );

  // Uploading files is a three step process where:
  // 1. A read/write SAS needs to be generated.
  // 2. The SAS then needs to be consumed.
  // 3. A third and final request is made to the api in order to
  //    update the file record in the database and mark the upload as complete.
  // TODO: Can probably improve this drastically with Azure Functions.
  const upload = useCallback(
    async (file: File) => {
      const { sas, file: _file } = (await generateUploadSAS(file)) || {};
      if (!sas || !_file) return null;

      await uploadBlob(sas, file);
      const updateFileResult = await updateFile(_file.id);
      if (!updateFileResult) return null;

      return _file;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [generateUploadSAS, updateFile],
  );

  return { upload };
};
