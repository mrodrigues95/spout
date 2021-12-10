import * as Types from '../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../utils/__generated__/fragments.generated';
export type DiscussionInfo_Discussion = (
  { __typename?: 'Discussion' }
  & Pick<Types.Discussion, 'id' | 'name'>
  & { classroom: (
    { __typename?: 'Classroom' }
    & Pick<Types.Classroom, 'id' | 'name'>
    & { users: Array<(
      { __typename?: 'User' }
      & UserInfo_User
    )>, discussions: Array<(
      { __typename?: 'Discussion' }
      & Pick<Types.Discussion, 'id' | 'name'>
    )> }
  ) }
);

export type DiscussionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DiscussionQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & DiscussionInfo_Discussion
  ) }
);
