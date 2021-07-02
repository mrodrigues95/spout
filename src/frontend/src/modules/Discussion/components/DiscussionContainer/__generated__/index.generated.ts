import * as Types from '../../../../../__generated__/schema.generated';

import { UserInfo_User } from '../../Discussion/__generated__/index.generated';
export type DiscussionMessages_Message = (
  { __typename?: 'Message' }
  & Pick<Types.Message, 'id' | 'body' | 'createdAt'>
  & { createdBy: (
    { __typename?: 'User' }
    & UserInfo_User
  ) }
);

export type DiscussionMessagesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DiscussionMessagesQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
    & { messages: Array<(
      { __typename?: 'Message' }
      & DiscussionMessages_Message
    )> }
  ) }
);

export type OnDiscussionMessageReceivedVariables = Types.Exact<{
  discussionId: Types.Scalars['ID'];
}>;


export type OnDiscussionMessageReceived = (
  { __typename?: 'Subscription' }
  & { onDiscussionMessageReceived: (
    { __typename?: 'DiscussionMessageSubscriptionPayload' }
    & { message: (
      { __typename?: 'Message' }
      & DiscussionMessages_Message
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
