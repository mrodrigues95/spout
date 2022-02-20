import { useCallback } from 'react';
import { ConnectionHandler, graphql, useMutation } from 'react-relay';
import {
  SendDiscussionMessageInput,
  useSendDiscussionMessageMutation as useSendDiscussionMessageMutationType,
} from '../../../../__generated__/useSendDiscussionMessageMutation.graphql';

const mutation = graphql`
  mutation useSendDiscussionMessageMutation(
    $input: SendDiscussionMessageInput!
  ) {
    sendDiscussionMessage(input: $input) {
      message {
        id
      }
    }
  }
`;

let tempId = 0;

export const useSendDiscussionMessageMutation = () => {
  const [commit] = useMutation<useSendDiscussionMessageMutationType>(mutation);

  const sendDiscussionMessage = useCallback(
    (
      { discussionId, content, fileIds }: SendDiscussionMessageInput,
      creatorId: string,
    ) =>
      commit({
        variables: { input: { discussionId, content, fileIds } },
        optimisticUpdater: (store) => {
          // Get the discussion.
          const discussionRecord = store.get(discussionId);
          if (!discussionRecord) {
            throw new Error(
              `Unable to get discussion record for discussionId: ${discussionId}`,
            );
          }

          // Get the creator.
          const userRecord = store.get(creatorId);
          if (!userRecord) {
            throw new Error(
              `Unable to get user record for userId: ${creatorId}`,
            );
          }

          // Get the connection.
          const key = 'DiscussionMessagesList_discussion_messages';
          const conn = ConnectionHandler.getConnection(discussionRecord, key, {
            order: { createdAt: 'ASC' },
          });
          if (!conn) throw new Error(`Unable to get connection by key: ${key}`);

          // Create a new local discussion message.
          const id = `client:new_discussion_message:${tempId++}`;
          const newDiscussionMessageRecord = store.create(id, 'Message');
          newDiscussionMessageRecord.setValue(id, 'id');
          newDiscussionMessageRecord.setValue(content, 'content');
          newDiscussionMessageRecord.setValue(false, 'isEvent');
          newDiscussionMessageRecord.setValue(null, 'messageEvent');
          newDiscussionMessageRecord.setValue(
            new Date().toISOString(),
            'createdAt',
          );
          newDiscussionMessageRecord.setLinkedRecord(userRecord, 'createdBy');

          // Create the edge and insert it.
          const newEdge = ConnectionHandler.createEdge(
            store,
            conn,
            newDiscussionMessageRecord,
            'MessagesEdge',
          );
          ConnectionHandler.insertEdgeAfter(conn, newEdge);
        },
        // updater: (store) => {
        //   const message = store
        //     .getRootField('sendDiscussionMessage')
        //     .getLinkedRecord('message');

        //   const discussionRecord = store.get(discussionId);
        //   if (!discussionRecord) {
        //     throw new Error(
        //       `Unable to get discussion record for discussionId: ${discussionId}`
        //     );
        //   }

        //   const key = 'DiscussionMessagesList_discussion_messages';
        //   const conn = ConnectionHandler.getConnection(discussionRecord, key, {
        //     order: { createdAt: 'ASC' },
        //   });
        //   if (!conn) throw new Error(`Unable to get connection by key: ${key}`);

        //   const newEdge = ConnectionHandler.createEdge(
        //     store,
        //     conn,
        //     message,
        //     'MessagesEdge'
        //   );
        //   ConnectionHandler.insertEdgeAfter(conn, newEdge);
        // },
      }),
    [commit],
  );

  return { sendDiscussionMessage };
};
