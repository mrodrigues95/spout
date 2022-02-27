import { useCallback } from 'react';
import { useMutation, graphql } from 'react-relay';
import { DiscussionMessage, Me } from '../../../../utils/messages';
import { useUnpinDiscussionMessageMutation } from '../../../../../../__generated__/useUnpinDiscussionMessageMutation.graphql';

const mutation = graphql`
  mutation useUnpinDiscussionMessageMutation(
    $input: UnpinDiscussionMessageInput!
  ) {
    unpinDiscussionMessage(input: $input) {
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

export type UnpinFn = () => void;

export const useUnpinDiscussionMessage = (
  message: DiscussionMessage,
  me: Me,
) => {
  const [commit] = useMutation<useUnpinDiscussionMessageMutation>(mutation);

  const unpin: UnpinFn = useCallback(() => {
    commit({
      variables: { input: { messageId: message.id } },
      optimisticResponse: {
        unpinDiscussionMessage: {
          message: {
            id: message.id,
            pinnedBy: { id: me.id, name: me.name },
          },
        },
      },
    });
  }, [commit, me.id, me.name, message.id]);

  return { unpin };
};
