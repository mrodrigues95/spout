import { gql, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { OptimisticMessage as OptimisticMessageType, useStore } from './../../utils/messagesStore';
import Message from './Message';
import {
  SendDiscussionMessageMutation,
  SendDiscussionMessageMutationVariables,
} from './__generated__/OptimisticMessage.generated';

const mutation = gql`
  mutation SendDiscussionMessageMutation($input: SendDiscussionMessageInput!) {
    sendDiscussionMessage(input: $input) {
      message {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
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
  >(mutation);

  useEffect(() => {
    if (!data && !loading && !error) {
      sendMessage({
        variables: { input: { discussionId, body: message.body } },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    // Once removed, the list of messages will be re-rendered and this
    // optimistic message will no longer exist.
    if (data) remove(discussionId, message.optimisticId);
  }, [data]);

  // TODO: Handle loading/error states.
  return error ? (
    <div>Message failed to send</div>
  ) : (
    <Message message={message} isLast />
  );
};

export default OptimisticMessage;
