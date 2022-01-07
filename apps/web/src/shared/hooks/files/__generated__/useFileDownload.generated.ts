import * as Types from '../../../../__generated__/schema.generated';

import { File_File } from '../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type GenerateDownloadSasMutationVariables = Types.Exact<{
  input: Types.GenerateDownloadSasInput;
}>;


export type GenerateDownloadSasMutation = (
  { __typename?: 'Mutation' }
  & { generateDownloadSAS: (
    { __typename?: 'GenerateDownloadSASPayload' }
    & { generateSASPayload?: Types.Maybe<(
      { __typename?: 'GenerateSASPayload' }
      & Pick<Types.GenerateSasPayload, 'sas'>
      & { file: (
        { __typename?: 'File' }
        & File_File
      ) }
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'FileNotFoundError' }
      & Pick<Types.FileNotFoundError, 'message'>
    ) | (
      { __typename?: 'GenerateSignatureError' }
      & Pick<Types.GenerateSignatureError, 'message'>
    )>> }
  ) }
);
