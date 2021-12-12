import { useCallback, useEffect, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { Spinner } from '@spout/toolkit';
import { ErrorFallback, Card } from '../../../../../shared/components';
import { useStore } from './utils/messagesStore';
import { MessageFragment, UserInfoFragment } from '../../utils/fragments';
import { updateMessagesQuery } from '../../utils/updateMessagesQuery';
import {
  DiscussionMessagesQuery,
  MeQuery,
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
} from './__generated__/index.generated';
import MessageList from './MessageList';
import MessageComposer from './MessageComposer';

// TODO: Maybe use `before` instead?
export const query = gql`
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

// TODO: When a user navigates away from the discussion, we retrieve from the cache
// when they return so any new messages won't appear. May need to change the fetch policy
// for this.
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
    // fetchPolicy: 'cache-and-network',
    // nextFetchPolicy: 'cache-first'
  });

  const { data: meData } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `
  );

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
    const unsubscribe = subscribeToMore<
      OnDiscussionMessageReceived,
      OnDiscussionMessageReceivedVariables
    >({
      document: subscription,
      variables: { discussionId: discussionId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { message } = subscriptionData.data.onDiscussionMessageReceived;

        // We manually update the cache for new messages that are created by the current
        // user, so they can be ignored here.
        if (message.createdBy.id === meData?.me?.id) return prev;

        return updateMessagesQuery(prev, message);
      },
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussionId, meData, subscribeToMore]);

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

  return (
    <div className="flex flex-col flex-1 space-y-3">
      {loading && !data && <Spinner />}
      {error && (
        <ErrorFallback
          icon={<FeelingBlueIllustration className="w-full h-64" />}
          heading="Sorry, we can't load any messages for this discussion right now."
          action={refetch}
        />
      )}
      {data && (
        <>
          <Card className="p-0 relative flex flex-col flex-1 bg-indigo-50/40">
            <div className="absolute inset-0 w-full h-full bg-messages opacity-5" />
            <MessageList
              discussionId={discussionId}
              messages={messages}
              hasNext={data?.discussionById.messages?.pageInfo.hasNextPage}
              next={handleLoadMore}
            />
          </Card>
          <Card className="p-0">
            <MessageComposer discussionId={discussionId} />
          </Card>
        </>
      )}
    </div>
  );
};

export default Messages;
