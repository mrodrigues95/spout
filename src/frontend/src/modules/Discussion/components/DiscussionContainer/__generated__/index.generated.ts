import * as Types from '../../../../../__generated__/schema.generated';

export type OnDiscussionMessageReceivedVariables = Types.Exact<{
  discussionId: Types.Scalars['ID'];
}>;


export type OnDiscussionMessageReceived = (
  { __typename?: 'Subscription' }
  & { onDiscussionMessageReceived: (
    { __typename?: 'DiscussionMessageSubscriptionPayload' }
    & { message: (
      { __typename?: 'Message' }
      & Pick<Types.Message, 'body'>
    ) }
  ) }
);

export type SendDiscussionMessageVariables = Types.Exact<{
  input: Types.SendDiscussionMessageInput;
}>;


export type SendDiscussionMessage = (
  { __typename?: 'Mutation' }
  & { sendDiscussionMessage: (
    { __typename?: 'SendDiscussionMessagePayload' }
    & { message?: Types.Maybe<(
      { __typename?: 'Message' }
      & Pick<Types.Message, 'id'>
    )>, userErrors?: Types.Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<Types.UserError, 'message' | 'code'>
    )>> }
  ) }
);
