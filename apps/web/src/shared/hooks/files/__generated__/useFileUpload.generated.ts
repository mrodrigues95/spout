import * as Types from '../../../../__generated__/schema.generated';

import { File_File } from '../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type GenerateUploadSasMutationVariables = Types.Exact<{
  input: Types.GenerateUploadSasInput;
}>;


export type GenerateUploadSasMutation = (
  { __typename?: 'Mutation' }
  & { generateUploadSAS: (
    { __typename?: 'GenerateUploadSASPayload' }
    & Pick<Types.GenerateUploadSasPayload, 'sas'>
    & { file?: Types.Maybe<(
      { __typename?: 'File' }
      & File_File
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);

export type CompleteUploadMutationVariables = Types.Exact<{
  input: Types.CompleteUploadInput;
}>;


export type CompleteUploadMutation = (
  { __typename?: 'Mutation' }
  & { completeUpload: (
    { __typename?: 'CompleteUploadPayload' }
    & { file?: Types.Maybe<(
      { __typename?: 'File' }
      & File_File
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);