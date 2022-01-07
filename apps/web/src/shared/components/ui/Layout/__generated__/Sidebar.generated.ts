import * as Types from '../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
import { ClassroomInfo_Classroom } from '../../../../../modules/Classrooms/components/__generated__/ViewClassroom.generated';
export type CreateClassroomMutationVariables = Types.Exact<{
  input: Types.CreateClassroomInput;
}>;


export type CreateClassroomMutation = (
  { __typename?: 'Mutation' }
  & { createClassroom: (
    { __typename?: 'CreateClassroomPayload' }
    & { classroom?: Types.Maybe<(
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id' | 'name'>
    )> }
  ) }
);

export type ClassroomsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ClassroomsQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & { classrooms: Array<(
      { __typename?: 'Classroom' }
      & ClassroomInfo_Classroom
    )> }
    & UserInfo_User
  )> }
);
