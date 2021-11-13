import { useCallback, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import {
  OptimisticMessage as OptimisticMessageType,
  useStore,
} from './utils/messagesStore';
import Message from './Message';
import { query } from '.';
import {
  SendDiscussionMessageMutation,
  SendDiscussionMessageMutationVariables,
} from './__generated__/OptimisticMessage.generated';
import { DiscussionMessagesQuery } from './__generated__/index.generated';
import { updateMessagesQuery } from '../../utils/updateMessagesQuery';
import { MessageFragment } from '../../utils/fragments';

const mutation = gql`
  mutation SendDiscussionMessageMutation($input: SendDiscussionMessageInput!) {
    sendDiscussionMessage(input: $input) {
      message {
        ...Message_message
      }
      userErrors {
        message
        code
      }
    }
  }
  ${MessageFragment}
`;

interface Props {
  discussionId: string;
  message: OptimisticMessageType;
}

const OptimisticMessage = ({ discussionId, message }: Props) => {
  const remove = useStore((state) => state.remove);

  const [sendMessage, { data, loading, error }] = useMutation<
    SendDiscussionMessageMutation,
    SendDiscussionMessageMutationVariables
  >(mutation, {
    // Unfortunately, we need to update the cache manually for this mutation
    // because the subscription result will get returned before the mutation
    // is completed. This means that there will be cases where the messages list
    // contains the optimistic message and the new message from the subscription
    // which results in duplicates values for a short period of time.
    // TODO: Maybe there's a better way to handle this?
    update: (cache, { data }) => {
      const newMessage = data?.sendDiscussionMessage.message;
      const prev = cache.readQuery<DiscussionMessagesQuery>({
        query: query,
        variables: { id: discussionId },
      });

      if (prev && newMessage) {
        const draft = updateMessagesQuery(prev, newMessage);

        // TODO: This will cause two re-renders in the `Messages` component, ideally it should
        // only cause one.
        remove(discussionId, message.optimisticId);
        cache.writeQuery<DiscussionMessagesQuery>({
          query: query,
          data: draft,
        });
      }
    },
  });

  const send = useCallback(
    () =>
      sendMessage({
        variables: { input: { discussionId, content: message.content } },
      }),
    [discussionId, sendMessage, message],
  );

  useEffect(() => {
    // Fire mutation as soon as this component is rendered.
    // TODO: Can use an IIFE here.
    if (!data && !loading && !error) send();
  }, [data, loading, error, send]);

  return (
    <Message
      message={message}
      optimisticOpts={{ error, loading, retry: send }}
      isLast
    />
  );
};

export default OptimisticMessage;
