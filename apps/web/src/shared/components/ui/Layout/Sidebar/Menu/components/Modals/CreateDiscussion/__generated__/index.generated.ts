import * as Types from '../../../../../../../../../../__generated__/schema.generated';

export type CreateDiscussionMutationVariables = Types.Exact<{
  input: Types.CreateDiscussionInput;
}>;


export type CreateDiscussionMutation = (
  { __typename?: 'Mutation' }
  & { createDiscussion: (
    { __typename?: 'CreateDiscussionPayload' }
    & { discussion?: Types.Maybe<(
      { __typename?: 'Discussion' }
      & Pick<Types.Discussion, 'id'>
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
