import * as Types from '../../../../../__generated__/schema.generated';

import { ClassroomInfo_Classroom } from '../../../components/__generated__/ViewClassroom.generated';
import { DiscussionMessages_Discussion } from './DiscussionMessages.generated';
export type DiscussionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  after?: Types.Maybe<Types.Scalars['String']>;
}>;


export type DiscussionQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
    & { classroom: (
      { __typename?: 'Classroom' }
      & ClassroomInfo_Classroom
    ) }
    & DiscussionMessages_Discussion
  ) }
);
