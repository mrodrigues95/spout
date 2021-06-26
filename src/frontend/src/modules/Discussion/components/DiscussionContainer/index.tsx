import { useCallback } from 'react';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  Container,
  Spinner,
  ErrorFallback,
  MessageContainer,
} from '~/shared/components';
import { MessageProvider } from '~/shared/components';
import { FeelingBlueIllustration } from '~/shared/assets';
import { DISCUSSION_QUERY } from '../Discussion';
import { DiscussionQuery } from '../Discussion/__generated__/index.generated';
import DiscussionActionsMenu from '../DiscussionActionsMenu';
import DiscussionMembers from '../DiscussionMembers';
import {
  OnDiscussionMessageReceived,
  OnDiscussionMessageReceivedVariables,
  SendDiscussionMessage,
  SendDiscussionMessageVariables,
} from './__generated__/index.generated';

const MESSAGE_RECEIVED = gql`
  subscription OnDiscussionMessageReceived($discussionId: ID!) {
    onDiscussionMessageReceived(discussionId: $discussionId) {
      message {
        body
      }
    }
  }
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

const DiscussionContainer = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(
    DISCUSSION_QUERY,
    {
      variables: { id: router.query.discussionId },
    }
  );

  const {
    data: subscriptionData,
  } = useSubscription<
    OnDiscussionMessageReceived,
    OnDiscussionMessageReceivedVariables
  >(MESSAGE_RECEIVED, {
    variables: { discussionId: router.query.discussionId as string },
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

  console.log(subscriptionData);

  return (
    <Container>
      <Container.Header title={data?.discussionById.name}>
        {data ? (
          <>
            <DiscussionMembers users={data.discussionById.users} />
            <DiscussionActionsMenu />
          </>
        ) : null}
      </Container.Header>
      {loading && <Spinner className="h-5 w-5 text-black" />}
      {error && (
        <ErrorFallback
          icon={<FeelingBlueIllustration className="w-full h-64" />}
          message="Sorry, we can't load this discussion right now"
          action={refetch}
        />
      )}
      {data && (
        <Container.Body>
          <MessageProvider onNewMessage={onNewMessage}>
            <MessageContainer />
          </MessageProvider>
        </Container.Body>
      )}
    </Container>
  );
};

export default DiscussionContainer;
