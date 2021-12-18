import * as Types from '../../../../../../__generated__/schema.generated';

export type UpdateDiscussionTopicMutationVariables = Types.Exact<{
  input: Types.UpdateDiscussionTopicInput;
}>;


export type UpdateDiscussionTopicMutation = (
  { __typename?: 'Mutation' }
  & { updateDiscussionTopic: (
    { __typename?: 'UpdateDiscussionTopicPayload' }
    & { discussion?: Types.Maybe<(
      { __typename?: 'Discussion' }
      & Pick<Types.Discussion, 'id' | 'topic'>
    )> }
  ) }
);

export type UpdateDiscussionDescriptionMutationVariables = Types.Exact<{
  input: Types.UpdateDiscussionDescriptionInput;
}>;


export type UpdateDiscussionDescriptionMutation = (
  { __typename?: 'Mutation' }
  & { updateDiscussionDescription: (
    { __typename?: 'UpdateDiscussionDescriptionPayload' }
    & { discussion?: Types.Maybe<(
      { __typename?: 'Discussion' }
      & Pick<Types.Discussion, 'id' | 'description'>
    )> }
  ) }
);
