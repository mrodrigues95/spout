import * as Types from '../../../../__generated__/schema.generated';

import { File_File } from '../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type GenerateUploadSasMutationVariables = Types.Exact<{
  input: Types.GenerateUploadSasInput;
}>;


export type GenerateUploadSasMutation = (
  { __typename?: 'Mutation' }
  & { generateUploadSAS: (
    { __typename?: 'GenerateUploadSASPayload' }
    & { generateSASPayload?: Types.Maybe<(
      { __typename?: 'GenerateSASPayload' }
      & Pick<Types.GenerateSasPayload, 'sas'>
      & { file: (
        { __typename?: 'File' }
        & File_File
      ) }
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'GenerateSignatureError' }
      & Pick<Types.GenerateSignatureError, 'message'>
    ) | (
      { __typename?: 'ParseSignatureError' }
      & Pick<Types.ParseSignatureError, 'message'>
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
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'BlobNotFoundError' }
      & Pick<Types.BlobNotFoundError, 'message'>
    ) | (
      { __typename?: 'BlobPropertiesError' }
      & Pick<Types.BlobPropertiesError, 'message'>
    ) | (
      { __typename?: 'FileNotFoundError' }
      & Pick<Types.FileNotFoundError, 'message'>
    )>> }
  ) }
);
