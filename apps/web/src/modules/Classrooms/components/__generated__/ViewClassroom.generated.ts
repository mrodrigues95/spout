import * as Types from '../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../Discussion/utils/__generated__/fragments.generated';
export type ClassroomInfo_Classroom = (
  { __typename?: 'Classroom' }
  & Pick<Types.Classroom, 'id' | 'name'>
  & { users: Array<(
    { __typename?: 'User' }
    & UserInfo_User
  )>, discussions: Array<(
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
  )> }
);

export type ClassroomQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ClassroomQuery = (
  { __typename?: 'Query' }
  & { classroomById: (
    { __typename?: 'Classroom' }
    & ClassroomInfo_Classroom
  ) }
);
