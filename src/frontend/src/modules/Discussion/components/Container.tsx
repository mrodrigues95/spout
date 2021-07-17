import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { USER_INFO_FRAGMENT } from '.';
import {
  Container,
  Spinner,
  Skeleton,
  ErrorFallback,
  MessageContainer,
  MessageProvider,
} from '~/shared/components';
import { FeelingBlueIllustration } from '~/shared/assets';
import { UserInfo_User } from './__generated__/index.generated';
import ActionsMenu from './ActionsMenu';
import Members from './Members';
import {
  DiscussionMessagesQuery,
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
  SendDiscussionMessage,
  SendDiscussionMessageVariables,
} from './__generated__/Container.generated';

export const MESSAGE_FRAGMENT = gql`
  fragment Message_message on Message {
    id
    body
    createdAt
    createdBy {
      ...UserInfo_user
    }
  }
  ${USER_INFO_FRAGMENT}
`;

const DISCUSSION_MESSAGES_QUERY = gql`
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
  ${MESSAGE_FRAGMENT}
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnDiscussionMessageReceived($discussionId: ID!) {
    onDiscussionMessageReceived(discussionId: $discussionId) {
      message {
        ...Message_message
      }
    }
  }
  ${MESSAGE_FRAGMENT}
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SendDiscussionMessage($input: SendDiscussionMessageInput!) {
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
  members: UserInfo_User[];
}

const DiscussionContainer = ({ members }: Props) => {
  const [shouldScrollBottom, setShouldScrollBottom] = useState(false);
  const router = useRouter();
  const {
    data,
    loading,
    error,
    refetch,
    subscribeToMore,
    fetchMore,
  } = useQuery<DiscussionMessagesQuery>(DISCUSSION_MESSAGES_QUERY, {
    variables: { id: router.query.discussionId as string },
    fetchPolicy: 'network-only',
  });

  const [sendMessage] = useMutation<
    SendDiscussionMessage,
    SendDiscussionMessageVariables
  >(SEND_MESSAGE_MUTATION, {
    onCompleted: () => setShouldScrollBottom(true),
  });

  const onNewMessage = useCallback(
    (message: string) => {
      sendMessage({
        variables: {
          input: {
            discussionId: router.query.discussionId as string,
            body: message,
          },
        },
      });
    },
    [router.query.discussionId, sendMessage]
  );

  const handleLoadMore = useCallback(() => {
    const pageInfo = data?.discussionById.messages?.pageInfo;

    if (pageInfo?.hasNextPage) {
      fetchMore({
        variables: {
          discussionId: router.query.discussionId as string,
          after: data?.discussionById.messages?.pageInfo.endCursor,
        },
      });
    }
  }, [
    router.query.discussionId,
    data?.discussionById.messages?.pageInfo,
    fetchMore,
  ]);

  useLayoutEffect(() => {
    subscribeToMore<
      OnDiscussionMessageReceived,
      OnDiscussionMessageReceivedVariables
    >({
      document: MESSAGE_SUBSCRIPTION,
      variables: { discussionId: router.query.discussionId as string },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        console.log('Prev: ', prev);
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
  }, [router.query.discussionId, subscribeToMore]);

  const messages = useMemo(() => {
    const edges = data?.discussionById.messages?.edges ?? [];
    return edges.map((edge) => ({ ...edge.node })).reverse();
  }, [data?.discussionById.messages?.edges]);

  return (
    <Container>
      <Container.Header title={data?.discussionById.name}>
        <Members members={members} />
        <ActionsMenu />
      </Container.Header>
      {loading && <Spinner className="h-5 w-5 text-black" />}
      {error && (
        <ErrorFallback
          icon={<FeelingBlueIllustration className="w-full h-64" />}
          message="Sorry, we can't load any messages for this discussion right now."
          action={refetch}
        />
      )}
      {data && (
        <Container.Body>
          <MessageProvider onNewMessage={onNewMessage}>
            <MessageContainer
              messages={messages}
              scrollOnNewMessage={{
                shouldScroll: shouldScrollBottom,
                setShouldScroll: setShouldScrollBottom,
              }}
              infiniteListOpts={{
                length: messages.length,
                hasNext: data.discussionById.messages!.pageInfo.hasNextPage,
                next: handleLoadMore,
                isReverse: true,
                loader: <Skeleton h="h-3" />,
              }}
            />
          </MessageProvider>
        </Container.Body>
      )}
    </Container>
  );
};

export default DiscussionContainer;
