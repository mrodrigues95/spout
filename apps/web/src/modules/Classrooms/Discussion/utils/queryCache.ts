import { ApolloCache } from '@apollo/client';
import { DiscussionFilesQuery as _DiscussionFilesQuery } from '../components/DiscussionDetails/__generated__/Attachments.generated';
import { query as DiscussionFilesQuery } from '../components/DiscussionDetails/Attachments';
import { DiscussionQuery } from '../components/__generated__/Discussion.generated';
import { Message_Message } from './__generated__/fragments.generated';

export const updateMessagesQuery = (
  prev: DiscussionQuery,
  message: Message_Message
) => {
  const edges = [...(prev.discussionById.messages?.edges ?? [])];

  // Only insert if this message is not already in the discussion.
  if (
    !prev.discussionById.messages?.edges?.find(
      ({ node }) => node.id === message.id
    )
  ) {
    edges.unshift({
      __typename: 'MessagesEdge',
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

export const updateDiscussionFilesQuery = (
  cache: ApolloCache<any>,
  message: Message_Message,
  discussionId: string
) => {
  // Only update the cache if this new message includes any attachments.
  if (!message.attachments.length) return;

  const prev = cache.readQuery<_DiscussionFilesQuery>({
    query: DiscussionFilesQuery,
    variables: { id: discussionId },
  });

  if (prev) {
    const edges = [...(prev.files?.edges ?? [])];

    for (const attachment of message.attachments) {
      edges.push({ __typename: 'FilesEdge', node: attachment });
    }

    const draft = {
      ...prev,
      files: {
        ...prev.files!,
        edges: [...prev.files!.edges!, ...edges],
      },
    };

    cache.writeQuery<_DiscussionFilesQuery>({
      query: DiscussionFilesQuery,
      data: draft,
    });
  }
};
