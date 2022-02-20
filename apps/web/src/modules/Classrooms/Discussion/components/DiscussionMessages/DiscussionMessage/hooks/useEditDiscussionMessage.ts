import { useCallback } from 'react';
import { useMutation, graphql } from 'react-relay';
import { DiscussionMessage } from '../../../../utils/messages';
import { useEditDiscussionMessageMutation } from '../../../../../../../__generated__/useEditDiscussionMessageMutation.graphql';

const mutation = graphql`
  mutation useEditDiscussionMessageMutation(
    $input: UpdateDiscussionMessageInput!
  ) {
    updateDiscussionMessage(input: $input) {
      message {
        id
        content
      }
    }
  }
`;

export type EditFn = (updatedContent: string) => void;

export const useEditDiscussionMessage = (message: DiscussionMessage) => {
  const [commit] = useMutation<useEditDiscussionMessageMutation>(mutation);

  const edit: EditFn = useCallback(
    (updatedContent: string) => {
      commit({
        variables: {
          input: { messageId: message.id, content: updatedContent },
        },
        optimisticResponse: {
          updateDiscussionMessage: {
            message: {
              id: message.id,
              content: updatedContent,
            },
          },
        },
      });
    },
    [commit, message.id]
  );

  return { edit };
};
