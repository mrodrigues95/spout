import * as Types from '../../../../../../../../../../__generated__/schema.generated';

export type JoinClassroomMutationVariables = Types.Exact<{
  input: Types.JoinClassroomInput;
}>;


export type JoinClassroomMutation = (
  { __typename?: 'Mutation' }
  & { joinClassroom: (
    { __typename?: 'JoinClassroomPayload' }
    & { classroom?: Types.Maybe<(
      { __typename?: 'Classroom' }
      & Pick<Types.Classroom, 'id'>
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
