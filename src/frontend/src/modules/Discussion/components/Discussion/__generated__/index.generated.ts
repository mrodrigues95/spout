import * as Types from '../../../../../__generated__/schema.generated';

export type UserInfo_User = (
  { __typename?: 'User' }
  & Pick<Types.User, 'id' | 'name'>
);

export type DiscussionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DiscussionQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
    & { users: Array<(
      { __typename?: 'User' }
      & UserInfo_User
    )> }
  ) }
);
