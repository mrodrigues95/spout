import * as Types from '../../../../../../__generated__/schema.generated';

import { File_File } from '../../../utils/__generated__/fragments.generated';
export type DiscussionFilesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  before?: Types.Maybe<Types.Scalars['String']>;
}>;


export type DiscussionFilesQuery = (
  { __typename?: 'Query' }
  & { files?: Types.Maybe<(
    { __typename?: 'FilesConnection' }
    & { edges?: Types.Maybe<Array<(
      { __typename?: 'FilesEdge' }
      & { node: (
        { __typename?: 'File' }
        & File_File
      ) }
    )>>, pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ) }
  )> }
);
