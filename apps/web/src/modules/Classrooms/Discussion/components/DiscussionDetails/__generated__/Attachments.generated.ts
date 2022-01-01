import * as Types from '../../../../../../__generated__/schema.generated';

import { UserInfo_User, File_File } from '../../../utils/__generated__/fragments.generated';
export type MeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & UserInfo_User
  )> }
);

export type DiscussionFilesQueryVariables = Types.Exact<{
  discussionId: Types.Scalars['ID'];
  uploadedById: Types.Scalars['ID'];
  after?: Types.Maybe<Types.Scalars['String']>;
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
