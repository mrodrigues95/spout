import { OperationVariables, QueryResult } from '@apollo/client';
import {
  Container,
  Spinner,
  ErrorFallback,
  MessageContainer,
} from '~/shared/components';
import { MessageProvider } from '~/shared/components';
import { FeelingBlueIllustration } from '~/shared/assets';
import { DiscussionQuery } from '../Discussion/__generated__/index.generated';
import { Message } from '~/__generated__/schema.generated';
import DiscussionActionsMenu from '../DiscussionActionsMenu';
import DiscussionMembers from '../DiscussionMembers';
import { useCallback } from 'react';

interface Props {
  queryResult: QueryResult<DiscussionQuery, OperationVariables>;
}

const DiscussionContainer = ({ queryResult }: Props) => {
  const { data, loading, error, refetch } = queryResult;

  const onNewMessage = useCallback((message: Partial<Message>) => {
    console.log(message);
  }, []);

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
