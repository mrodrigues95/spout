import { gql, useMutation } from '@apollo/client';
import { FileFragment } from '../../../modules/Classrooms/Discussion/utils/fragments';
import { RefObject, useCallback } from 'react';
import {
  GenerateDownloadSasMutation,
  GenerateDownloadSasMutationVariables,
} from './__generated__/useFileDownload.generated';

const mutation = gql`
  mutation GenerateDownloadSASMutation($input: GenerateDownloadSASInput!) {
    generateDownloadSAS(input: $input) {
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

export const useFileDownload = () => {
  const [generate, { loading }] = useMutation<
    GenerateDownloadSasMutation,
    GenerateDownloadSasMutationVariables
  >(mutation);

  const generateDownloadSAS = useCallback(
    async (fileId: string) => {
      try {
        const { data, errors } = await generate({
          variables: {
            input: {
              fileId,
            },
          },
        });

        if (errors || data!.generateDownloadSAS.userErrors) {
          return null;
        }

        const { sas, file } = data!.generateDownloadSAS!;
        return { sas, file };
      } catch (e) {
        console.error(`[Error generating download SAS]: ${e}`);
        return null;
      }
    },
    [generate]
  );

  const viewFile = useCallback(
    async (ref: RefObject<HTMLAnchorElement>, fileId: string) => {
      const { sas } = (await generateDownloadSAS(fileId)) || {};
      if (!sas) return;

      // TODO: Is there a better way to handle loading external links like this?
      if (ref.current) {
        ref.current.href = sas;
        ref.current.click();
        ref.current.href = '';
      }
    },
    [generateDownloadSAS]
  );

  return { generateDownloadSAS, loading, viewFile };
};
