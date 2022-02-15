import { useMemo } from 'react';
import { graphql, useSubscription, ConnectionHandler } from 'react-relay';
import {
  GraphQLSubscriptionConfig,
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';
import { useDiscussionMessagesSubscription as useDiscussionMessagesSubscriptionType } from './__generated__/useDiscussionMessagesSubscription.graphql';

const subscription = graphql`
  subscription useDiscussionMessagesSubscription($discussionId: ID!) {
    onDiscussionMessageReceived(discussionId: $discussionId) {
      message {
        id
        content
        createdAt
        isDiscussionEvent
        discussionEvent
        attachments {
          id
          location
          name
          contentLength
          extension
        }
        createdBy {
          id
          name
          avatarUrl
          profileColor
        }
      }
    }
  }
`;

export const sharedUpdater = (
  store: RecordSourceSelectorProxy,
  discussionId: string,
  message: RecordProxy,
) => {
  // Get the discussion.
  const discussionRecord = store.get(discussionId);
  if (!discussionRecord) {
    throw new Error(
      `Unable to get discussion record for discussionId: ${discussionId}`,
    );
  }

  // Get the connection.
  const key = 'DiscussionMessagesList_discussion_messages';
  const conn = ConnectionHandler.getConnection(discussionRecord, key, {
    order: { createdAt: 'ASC' },
  });
  if (!conn) throw new Error(`Unable to get connection by key: ${key}`);

  // Insert edge.
  const newEdge = ConnectionHandler.createEdge(
    store,
    conn,
    message,
    'MessagesEdge',
  );
  ConnectionHandler.insertEdgeAfter(conn, newEdge);
};

export const useDiscussionMessagesSubscription = (
  discussionId: string,
  creatorId: string,
) => {
  const config: GraphQLSubscriptionConfig<useDiscussionMessagesSubscriptionType> =
    useMemo(
      () => ({
        variables: { discussionId },
        subscription,
        updater: (store) => {
          const message = store
            .getRootField('onDiscussionMessageReceived')
            .getLinkedRecord('message');

          // Messages (not events) created by the same user are handled within
          // the mutation.
          if (
            !message.getValue('isDiscussionEvent') &&
            message.getLinkedRecord('createdBy').getValue('id') === creatorId
          ) {
            return;
          }

          sharedUpdater(store, discussionId, message);
        },
      }),
      [discussionId, creatorId],
    );

  useSubscription<useDiscussionMessagesSubscriptionType>(config);
};
