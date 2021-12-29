import * as Types from '../../../../__generated__/schema.generated';

import { File_File } from '../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type GenerateDownloadSasMutationVariables = Types.Exact<{
  input: Types.GenerateDownloadSasInput;
}>;


export type GenerateDownloadSasMutation = (
  { __typename?: 'Mutation' }
  & { generateDownloadSAS: (
    { __typename?: 'GenerateDownloadSASPayload' }
    & Pick<Types.GenerateDownloadSasPayload, 'sas'>
    & { file?: Types.Maybe<(
      { __typename?: 'File' }
      & File_File
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
