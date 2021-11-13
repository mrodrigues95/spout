import { DiscussionMessagesQuery } from '../components/Messages/__generated__/index.generated';
import { Message_Message } from './__generated__/fragments.generated';

export const updateMessagesQuery = (
  prev: DiscussionMessagesQuery,
  message: Message_Message,
) => {
  const edges = [...(prev.discussionById?.messages?.edges ?? [])];

  // Only insert if this message is not already in the discussion.
  if (
    !prev.discussionById.messages?.edges?.find(
      ({ node }) => node.id === message.id,
    )
  ) {
    edges.unshift({
      __typename: 'MessageEdge',
      node: message,
    });
  }

  const draft = {
    ...prev,
    discussionById: {
      ...prev.discussionById,
      messages: { ...prev.discussionById.messages!, edges },
    },
  };

  return draft;
};
