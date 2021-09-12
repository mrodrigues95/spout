import * as Types from '../../../../../../../../../../__generated__/schema.generated';

export type CreateClassroomMutationVariables = Types.Exact<{
  input: Types.CreateClassroomInput;
}>;


export type CreateClassroomMutation = (
  { __typename?: 'Mutation' }
  & { createClassroom: (
    { __typename?: 'CreateClassroomPayload' }
    & { classroom: (
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id'>
    ) }
  ) }
);
