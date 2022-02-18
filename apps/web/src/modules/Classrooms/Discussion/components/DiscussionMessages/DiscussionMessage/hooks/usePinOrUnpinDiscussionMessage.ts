import { useCallback } from 'react';
import { useMutation, graphql } from 'react-relay';
import { DiscussionMessage, Me } from '../../../../utils/messages';
import { usePinOrUnpinDiscussionMessageMutation } from './__generated__/usePinOrUnpinDiscussionMessageMutation.graphql';

const mutation = graphql`
  mutation usePinOrUnpinDiscussionMessageMutation(
    $input: PinOrUnpinDiscussionMessageInput!
  ) {
    pinOrUnpinDiscussionMessage(input: $input) {
      message {
        id
        pinnedBy {
          id
          name
        }
      }
    }
  }
`;

export type PinOrUnpinFn = () => void;

export const usePinOrUnpinDiscussionMessage = (
  message: DiscussionMessage,
  me: Me
) => {
  const [commit] = useMutation<usePinOrUnpinDiscussionMessageMutation>(
    mutation
  );

  const pinOrUnpin: PinOrUnpinFn = useCallback(() => {
    commit({
      variables: { input: { messageId: message.id } },
      optimisticResponse: {
        pinOrUnpinDiscussionMessage: {
          message: { id: message.id, pinnedBy: { id: me.id, name: me.name } },
        },
      },
    });
  }, [commit, message.id, me.id, me.name]);

  return { pinOrUnpin };
};
