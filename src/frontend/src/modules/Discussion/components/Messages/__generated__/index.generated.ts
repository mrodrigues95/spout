import * as Types from '../../../../../__generated__/schema.generated';

import { Message_Message } from '../../../utils/__generated__/fragments.generated';
export type DiscussionMessagesQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  after?: Types.Maybe<Types.Scalars['String']>;
}>;


export type DiscussionMessagesQuery = (
  { __typename?: 'Query' }
  & { discussionById: (
    { __typename?: 'Discussion' }
    & Pick<Types.Discussion, 'id' | 'name'>
    & { messages?: Types.Maybe<(
      { __typename?: 'MessageConnection' }
      & { edges?: Types.Maybe<Array<(
        { __typename?: 'MessageEdge' }
        & { node: (
          { __typename?: 'Message' }
          & Message_Message
        ) }
      )>>, pageInfo: (
        { __typename?: 'PageInfo' }
        & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
      ) }
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
      & Message_Message
    ) }
  ) }
);