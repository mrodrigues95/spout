import { useCallback, useLayoutEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Container,
  Spinner,
  ErrorFallback,
  MessageContainer,
} from '~/shared/components';
import { MessageProvider } from '~/shared/components';
import { FeelingBlueIllustration } from '~/shared/assets';
import { USER_INFO_FRAGMENT } from '../Discussion';
import { UserInfo_User } from '../Discussion/__generated__/index.generated';
import DiscussionActionsMenu from '../DiscussionActionsMenu';
import DiscussionMembers from '../DiscussionMembers';
import {
  DiscussionMessagesQuery,
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
  SendDiscussionMessage,
  SendDiscussionMessageVariables,
} from './__generated__/index.generated';

export const DISCUSSION_MESSAGES_FRAGMENT = gql`
  fragment DiscussionMessages_message on Message {
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
  query DiscussionMessagesQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
      messages {
        ...DiscussionMessages_message
      }
    }
  }
  ${USER_INFO_FRAGMENT}
  ${DISCUSSION_MESSAGES_FRAGMENT}
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnDiscussionMessageReceived($discussionId: ID!) {
    onDiscussionMessageReceived(discussionId: $discussionId) {
      message {
        ...DiscussionMessages_message
      }
    }
  }
  ${DISCUSSION_MESSAGES_FRAGMENT}
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
  const router = useRouter();
  const { data, loading, error, refetch, subscribeToMore } = useQuery<
    DiscussionMessagesQuery
  >(DISCUSSION_MESSAGES_QUERY, {
    variables: { id: router.query.discussionId },
  });

  const [sendMessage] = useMutation<
    SendDiscussionMessage,
    SendDiscussionMessageVariables
  >(SEND_MESSAGE_MUTATION);

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

  useLayoutEffect(() => {
    subscribeToMore<
      OnDiscussionMessageReceived,
      OnDiscussionMessageReceivedVariables
    >({
      document: MESSAGE_SUBSCRIPTION,
      variables: { discussionId: router.query.discussionId as string },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        return {
          discussionById: {
            ...prev.discussionById,
            messages: [
              ...prev.discussionById.messages,
              subscriptionData.data.onDiscussionMessageReceived.message,
            ],
          },
        };
      },
    });
  }, [router.query.discussionId, subscribeToMore]);

  return (
    <Container>
      <Container.Header title={data?.discussionById.name}>
        <DiscussionMembers members={members} />
        <DiscussionActionsMenu />
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
            <MessageContainer messages={data.discussionById.messages} />
          </MessageProvider>
        </Container.Body>
      )}
    </Container>
  );
};

export default DiscussionContainer;
