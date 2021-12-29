import { gql, useMutation } from '@apollo/client';
import { useCallback } from 'react';
import { FileFragment } from '../../../modules/Classrooms/Discussion/utils/fragments';
import {
  GenerateUploadSasMutation as _GenerateUploadSasMutation,
  GenerateUploadSasMutationVariables as _GenerateUploadSasMutationVariables,
  CompleteUploadMutation as _CompleteUploadMutation,
  CompleteUploadMutationVariables as _CompleteUploadMutationVariables,
} from './__generated__/useFileUpload.generated';
import { getFileExtensionFromContentType } from '../../utils';
import { useBlob } from './useBlob';

const GenerateUploadSASMutation = gql`
  mutation GenerateUploadSASMutation($input: GenerateUploadSASInput!) {
    generateUploadSAS(input: $input) {
      sas
      file {
        ...File_file
      }
      userErrors {
        message
        code
      }
    }
  }
  ${FileFragment}
`;

const CompleteUploadMutation = gql`
  mutation CompleteUploadMutation($input: CompleteUploadInput!) {
    completeUpload(input: $input) {
      file {
        ...File_file
      }
      userErrors {
        message
        code
      }
    }
  }
  ${FileFragment}
`;

export const useFileUpload = () => {
  const blob = useBlob();
  const [generate] = useMutation<
    _GenerateUploadSasMutation,
    _GenerateUploadSasMutationVariables
  >(GenerateUploadSASMutation);
  const [completeUpload] = useMutation<
    _CompleteUploadMutation,
    _CompleteUploadMutationVariables
  >(CompleteUploadMutation);

  const generateUploadSAS = useCallback(
    async (file: File) => {
      try {
        const { data, errors } = await generate({
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
        return { sas, file: _file };
      } catch (e) {
        console.error(`[Error generating SAS]: ${e}`);
        return null;
      }
    },
    [generate]
  );

  const uploadBlob = useCallback(
    async (sas: string, file: File) => {
      try {
        return await blob.upload(sas, file);
      } catch (e) {
        return null;
      }
    },
    [blob]
  );

  const updateFile = useCallback(
    async (fileId: string) => {
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
    },
    [completeUpload]
  );

  // Uploading files is a three step process where:
  // 1. A read/write SAS needs to be generated.
  // 2. The SAS then needs to be consumed.
  // 3. A third and final request is made to the api in order to
  //    update the file record in the database and mark the upload as complete.
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
    [generateUploadSAS, updateFile]
  );

  return { upload };
};
