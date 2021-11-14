import * as Types from '../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
export type CreateClassroomMutationVariables = Types.Exact<{
  input: Types.CreateClassroomInput;
}>;


export type CreateClassroomMutation = (
  { __typename?: 'Mutation' }
  & { createClassroom: (
    { __typename?: 'CreateClassroomPayload' }
    & { classroom: (
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id' | 'name'>
    ) }
  ) }
);

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
