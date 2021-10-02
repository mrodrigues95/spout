import * as Types from '../../../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../../../../../../modules/Discussion/utils/__generated__/fragments.generated';
export type ClassroomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ClassroomsQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & { classrooms: Array<(
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id' | 'name'>
      & { discussions: Array<(
        { __typename?: 'Discussion' }
        & Pick<Types.Discussion, 'id' | 'name'>
      )> }
    )> }
    & UserInfo_User
  )> }
);
