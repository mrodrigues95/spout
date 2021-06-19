import { MessageContainer, PrimaryLayout } from '~/shared/components';
import DiscussionContainer from '../DiscussionContainer';

const Discussion = () => {
  return (
    <PrimaryLayout title="C# Fundamentals">
      <DiscussionContainer>
        <MessageContainer />
      </DiscussionContainer>
    </PrimaryLayout>
  );
};

export default Discussion;
