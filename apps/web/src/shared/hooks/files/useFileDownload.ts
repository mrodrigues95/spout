// import { gql, useMutation } from '@apollo/client';
// import { FileFragment } from '../../../modules/Classrooms/Discussion/utils/fragments';
// import { RefObject, useCallback } from 'react';
// import {
//   GenerateDownloadSasMutation,
//   GenerateDownloadSasMutationVariables,
// } from './__generated__/useFileDownload.generated';

// const mutation = gql`
//   mutation GenerateDownloadSASMutation($input: GenerateDownloadSASInput!) {
//     generateDownloadSAS(input: $input) {
//       generateSASPayload {
//         sas
//         file {
//           ...File_file
//         }
//       }
//       errors {
//         ... on FileNotFoundError {
//           message
//         }
//         ... on GenerateSignatureError {
//           message
//         }
//       }
//     }
//   }
//   ${FileFragment}
// `;

// export const useFileDownload = () => {
//   const [generate, { loading }] = useMutation<
//     GenerateDownloadSasMutation,
//     GenerateDownloadSasMutationVariables
//   >(mutation);

//   const generateDownloadSAS = useCallback(
//     async (fileId: string) => {
//       try {
//         const { data } = await generate({
//           variables: {
//             input: {
//               fileId,
//             },
//           },
//         });

//         if (data?.generateDownloadSAS.errors) return null;

//         const { sas, file } = data!.generateDownloadSAS!.generateSASPayload!;
//         return { sas, file };
//       } catch (e) {
//         console.error(`[Error generating download SAS]: ${e}`);
//         return null;
//       }
//     },
//     [generate]
//   );

//   const viewFile = useCallback(
//     async (ref: RefObject<HTMLAnchorElement>, fileId: string) => {
//       const { sas } = (await generateDownloadSAS(fileId)) || {};
//       if (!sas) return;

//       // TODO: Is there a better way to handle loading external links like this?
//       if (ref.current) {
//         ref.current.href = sas;
//         ref.current.click();
//         ref.current.href = '';
//       }
//     },
//     [generateDownloadSAS]
//   );

//   return { generateDownloadSAS, loading, viewFile };
// };
