import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useBlob } from './useBlob';
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
        }
      }
      errors {
        ... on FileTypeNotAllowedError {
          __typename
          message
        }
        ... on ParseSignatureError {
          __typename
          message
        }
        ... on GenerateSignatureError {
          __typename
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
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;

export enum FileUploadErrorCode {
  FileInvalidType = 'file-invalid-type',
  FileTooSmall = 'file-too-small',
  FileTooLarge = 'file-too-large',
  ServerError = 'server-error',
}

interface FileProcessingResult<T> {
  data?: T;
  errorCode?: FileUploadErrorCode;
  isError: boolean;
}

export const useFileUpload = () => {
  const [generate] = useMutation<useFileUploadGenerateUploadSASMutation>(
    GenerateUploadSASMutation,
  );
  const [completeUpload] = useMutation<useFileUploadCompleteUploadMutation>(
    CompleteUploadMutation,
  );

  const blob = useBlob();
  const [isUploading, setIsUploading] = useState(false);

  const generateUploadSAS = useCallback(
    (file: File) => {
      return new Promise<
        FileProcessingResult<
          useFileUploadGenerateUploadSASMutation$data['generateUploadSAS']['generateSASPayload']
        >
      >((resolve) => {
        generate({
          variables: {
            input: {
              fileName: file.name,
              size: file.size,
              mimeType: file.type,
            },
          },
          onCompleted: ({
            generateUploadSAS: { generateSASPayload, errors },
          }) => {
            if (!errors) {
              const { sas, file: _file } = generateSASPayload!;
              return resolve({ data: { sas, file: _file }, isError: false });
            }

            const error = errors[0];
            switch (error.__typename) {
              case 'FileTypeNotAllowedError':
                return resolve({
                  isError: true,
                  errorCode: FileUploadErrorCode.FileInvalidType,
                });
              default:
                return resolve({
                  isError: true,
                  errorCode: FileUploadErrorCode.ServerError,
                });
            }
          },
          onError: (e) => {
            console.error('[Error generating SAS]: ', e);
            return resolve({
              isError: true,
              errorCode: FileUploadErrorCode.ServerError,
            });
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

  const completeFileUpload = useCallback(
    (fileId: string) => {
      return new Promise<
        FileProcessingResult<
          useFileUploadCompleteUploadMutation$data['completeUpload']['file']
        >
      >((resolve) => {
        completeUpload({
          variables: { input: { fileId } },
          onCompleted: (data) => {
            if (data.completeUpload.errors) {
              return resolve({
                isError: true,
                errorCode: FileUploadErrorCode.ServerError,
              });
            }

            return resolve({
              data: { ...data.completeUpload.file! },
              isError: false,
            });
          },
          onError: (e) => {
            console.error('[Error updating file]: ', e);
            return resolve({
              isError: true,
              errorCode: FileUploadErrorCode.ServerError,
            });
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
  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);

      const generateSASResult = await generateUploadSAS(file);
      if (generateSASResult.isError) {
        setIsUploading(false);
        return {
          file: null,
          isError: true,
          errorCode: generateSASResult.errorCode,
        };
      }

      await uploadBlob(generateSASResult.data!.sas, file);

      const { data, isError, errorCode } = await completeFileUpload(
        generateSASResult.data!.file.id,
      );
      setIsUploading(false);
      return { file: data, isError, errorCode };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [generateUploadSAS, completeFileUpload],
  );

  return { upload, isUploading };
};
