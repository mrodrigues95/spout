import * as Types from '../../../../../__generated__/schema.generated';

import { File_File } from '../../utils/__generated__/fragments.generated';
export type DeleteFileMutationVariables = Types.Exact<{
  input: Types.DeleteFileInput;
}>;


export type DeleteFileMutation = (
  { __typename?: 'Mutation' }
  & { deleteFile: (
    { __typename?: 'DeleteFilePayload' }
    & { file?: Types.Maybe<(
      { __typename?: 'File' }
      & File_File
    )>, errors?: Types.Maybe<Array<(
      { __typename?: 'FileNotFoundError' }
      & Pick<Types.FileNotFoundError, 'message'>
    ) | (
      { __typename?: 'BlobNotFoundError' }
      & Pick<Types.BlobNotFoundError, 'message'>
    ) | (
      { __typename?: 'BlobDeletionError' }
      & Pick<Types.BlobDeletionError, 'message'>
    )>> }
  ) }
);
