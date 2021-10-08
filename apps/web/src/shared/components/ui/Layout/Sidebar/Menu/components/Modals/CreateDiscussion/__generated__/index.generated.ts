import * as Types from '../../../../../../../../../../__generated__/schema.generated';

export type CreateDiscussionMutationVariables = Types.Exact<{
  input: Types.CreateDiscussionInput;
}>;


export type CreateDiscussionMutation = (
  { __typename?: 'Mutation' }
  & { createDiscussion: (
    { __typename?: 'CreateDiscussionPayload' }
    & { discussion: (
      { __typename?: 'Discussion' }
      & Pick<Types.Discussion, 'id'>
    ) }
  ) }
);
