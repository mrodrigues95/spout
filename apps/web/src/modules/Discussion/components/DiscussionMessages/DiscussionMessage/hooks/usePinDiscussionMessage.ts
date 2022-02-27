import { useCallback } from 'react';
import { useMutation, graphql } from 'react-relay';
import { DiscussionMessage, Me } from '../../../../utils/messages';
import { usePinDiscussionMessageMutation } from '../../../../../../__generated__/usePinDiscussionMessageMutation.graphql';

const mutation = graphql`
  mutation usePinDiscussionMessageMutation($input: PinDiscussionMessageInput!) {
    pinDiscussionMessage(input: $input) {
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

export type PinFn = () => void;

export const usePinDiscussionMessage = (message: DiscussionMessage, me: Me) => {
  const [commit] = useMutation<usePinDiscussionMessageMutation>(mutation);

  const pin: PinFn = useCallback(() => {
    commit({
      variables: { input: { messageId: message.id } },
      optimisticResponse: {
        pinDiscussionMessage: {
          message: {
            id: message.id,
            pinnedBy: { id: me.id, name: me.name },
          },
        },
      },
    });
  }, [commit, me.id, me.name, message.id]);

  return { pin };
};
