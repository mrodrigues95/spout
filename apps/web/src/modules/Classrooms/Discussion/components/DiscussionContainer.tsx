import { Container } from '../../../../shared/components';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import ActionsMenu from './ActionsMenu';
import Messages from './Messages';

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const DiscussionContainer = ({ discussion }: Props) => {
  return (
    <Container>
      <Container.Header title={discussion.name}>
        <ActionsMenu />
      </Container.Header>
      <Container.Body>
        <Messages discussionId={discussion.id} />
      </Container.Body>
    </Container>
  );
};

export default DiscussionContainer;
