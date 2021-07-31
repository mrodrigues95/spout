import { gql, useQuery } from '@apollo/client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton } from '~/shared/components';
import { useStore } from '../../utils/messagesStore';
import {
  DiscussionMessagesQuery,
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
} from './__generated__/index.generated';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';
import { MessageFragment } from '../../utils/fragments';

const query = gql`
  query DiscussionMessagesQuery($id: ID!, $after: String) {
    discussionById(id: $id) {
      id
      name
      messages(first: 50, after: $after, order: { id: DESC }) {
        edges {
          node {
            ...Message_message
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
  }
  ${MessageFragment}
`;

const subscription = gql`
  subscription OnDiscussionMessageReceived($discussionId: ID!) {
    onDiscussionMessageReceived(discussionId: $discussionId) {
      message {
        ...Message_message
      }
    }
  }
  ${MessageFragment}
`;

interface Props {
  discussionId: string;
}

const Messages = ({ discussionId }: Props) => {
  const {
    data,
    loading,
    error,
    refetch,
    subscribeToMore,
    fetchMore,
  } = useQuery<DiscussionMessagesQuery>(query, {
    variables: { id: discussionId },
  });

  const handleLoadMore = useCallback(async () => {
    const pageInfo = data?.discussionById.messages?.pageInfo;

    if (pageInfo?.hasNextPage) {
      return fetchMore({
        variables: {
          discussionId: discussionId,
          after: data?.discussionById.messages?.pageInfo.endCursor,
        },
      }).then(({ data }) => data);
    }
  }, [discussionId, data?.discussionById.messages?.pageInfo, fetchMore]);

  useEffect(() => {
    subscribeToMore<
      OnDiscussionMessageReceived,
      OnDiscussionMessageReceivedVariables
    >({
      document: subscription,
      variables: { discussionId: discussionId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { message } = subscriptionData.data.onDiscussionMessageReceived;
        const edges = [...(prev.discussionById?.messages?.edges ?? [])];

        // Only insert if this message is not already in the discussion.
        if (
          !prev?.discussionById.messages?.edges?.find(
            ({ node }) => node.id === message.id
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
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussionId, subscribeToMore]);

  const messagesToSend = useStore(
    (state) => state.messagesByDiscussionId[discussionId]
  );

  const messages = useMemo(() => {
    const edges = (data?.discussionById.messages?.edges ?? []).map((edge) => ({
      node: edge.node,
    }));
    const messagesToSendEdges = (messagesToSend ?? []).map((message) => ({
      node: message,
    }));

    return [...messagesToSendEdges, ...edges];
  }, [data?.discussionById.messages?.edges, messagesToSend]);

  // TODO: Handle error/loading states.
  return (
    <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
      <MessageList
        discussionId={discussionId}
        messages={messages}
        hasNext={data?.discussionById.messages!.pageInfo.hasNextPage ?? false}
        next={handleLoadMore}
      />
      <MessageComposer discussionId={discussionId} />
    </div>
  );
};

export default Messages;
