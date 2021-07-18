import { Container } from '~/shared/components';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import ActionsMenu from './ActionsMenu';
import Members from './Members';
import Messages from './Messages';

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const DiscussionContainer = ({ discussion }: Props) => {
  return (
    <Container>
      <Container.Header title={discussion.name}>
        <Members members={discussion.users} />
        <ActionsMenu />
      </Container.Header>
      {/* {loading && <Spinner className="h-5 w-5 text-black" />}
      {error && (
        <ErrorFallback
          icon={<FeelingBlueIllustration className="w-full h-64" />}
          message="Sorry, we can't load any messages for this discussion right now."
          action={refetch}
        />
      )} */}
      {/* {data && (
        <Container.Body>
          <Messages discussionId={discussion.id} />
        </Container.Body>
      )} */}
      <Container.Body>
        <Messages discussionId={discussion.id} />
      </Container.Body>
    </Container>
  );
};

export default DiscussionContainer;