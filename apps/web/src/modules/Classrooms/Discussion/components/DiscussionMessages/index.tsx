import { useCallback, useEffect, useMemo } from 'react';
import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  gql,
  OperationVariables,
  SubscribeToMoreOptions,
  useQuery,
} from '@apollo/client';
import { Card } from '@spout/toolkit';
import { MessageFragment, UserInfoFragment } from '../../utils/fragments';
import { DiscussionQuery } from '../__generated__/Discussion.generated';
import {
  MeQuery,
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
} from '../__generated__/DiscussionMessages.generated';
import {
  updateMessagesQuery,
  updateDiscussionFilesQuery,
} from '../../utils/queryCache';
import { useStore } from '../../utils/messagesStore';
import DiscussionMessageComposer from './Composer';
import DiscussionMessagesList from './DiscussionMessagesList';
import WelcomeHeader from './WelcomeHeader';

export const DiscussionMessagesFragment = gql`
  fragment DiscussionMessages_discussion on Discussion {
    messages(first: 50, after: $after) {
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

const query = gql`
  query MeQuery {
    me {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
`;

interface Props {
  discussion: DiscussionQuery['discussionById'];
  subscribeToMore: (
    options: SubscribeToMoreOptions<
      DiscussionQuery,
      OnDiscussionMessageReceivedVariables,
      OnDiscussionMessageReceived
    >
  ) => () => void;
  fetchMore: (
    fetchMoreOptions: FetchMoreQueryOptions<OperationVariables, DiscussionQuery>
  ) => Promise<ApolloQueryResult<DiscussionQuery>>;
}

// TODO: When a user navigates away from the discussion, we retrieve from the cache
// when they return so any new messages won't appear. May need to change the fetch policy
// for this.
const DicussionMessages = ({
  discussion,
  fetchMore,
  subscribeToMore,
}: Props) => {
  const { data, client } = useQuery<MeQuery>(query, {
    fetchPolicy: 'cache-only',
  });

  const handleLoadMore = useCallback(async () => {
    const pageInfo = discussion.messages?.pageInfo;

    if (pageInfo?.hasNextPage) {
      return fetchMore({
        variables: {
          discussionId: discussion.id,
          after: discussion.messages?.pageInfo.endCursor,
        },
      }).then(({ data }) => data);
    }

    return null;
  }, [discussion.id, discussion.messages?.pageInfo, fetchMore]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: subscription,
      variables: { discussionId: discussion.id },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { message } = subscriptionData.data.onDiscussionMessageReceived;

        // Update the sidebar "Attachments" panel.
        updateDiscussionFilesQuery(client.cache, message, discussion.id);

        // We manually update the cache for new messages that are created by the current
        // user and aren't events, so they can be ignored here.
        if (
          message.createdBy.id === data!.me!.id &&
          !message.isDiscussionEvent
        ) {
          return prev;
        }

        return updateMessagesQuery(prev, message);
      },
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [discussion.id, data, subscribeToMore, client]);

  // Optimistic messages.
  const messagesToSend = useStore(
    (state) => state.messagesByDiscussionId[discussion.id]
  );

  // Combine optimistic messages with already fetched messages.
  const messages = useMemo(() => {
    const edges = (discussion.messages?.edges ?? []).map((edge) => ({
      node: edge.node,
    }));

    const messagesToSendEdges = (messagesToSend ?? []).map((message) => ({
      node: message,
    }));

    return [...messagesToSendEdges, ...edges];
  }, [discussion.messages?.edges, messagesToSend]);

  return (
    <div className="flex flex-col flex-1 space-y-3">
      <Card className="p-0 relative flex flex-col flex-1 rounded-xl bg-indigo-50/40">
        <div className="absolute inset-0 w-full h-full bg-messages opacity-[7%]" />
        <DiscussionMessagesList
          discussionId={discussion.id}
          messages={messages}
          hasNext={discussion.messages?.pageInfo.hasNextPage}
          next={handleLoadMore}
          header={<WelcomeHeader discussion={discussion} />}
        />
      </Card>
      <Card className="p-0">
        <DiscussionMessageComposer discussion={discussion} />
      </Card>
    </div>
  );
};

export default DicussionMessages;
