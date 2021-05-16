import { ReactNode } from 'react';
import { Container } from '~/shared/components';
import DiscussionActionsMenu from '../DiscussionActionsMenu';
import DiscussionMembers from '../DiscussionMembers';

const DiscussionContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Container.Header title="C# Fundamentals">
        <DiscussionMembers />
        <DiscussionActionsMenu />
      </Container.Header>
      <Container.Body>{children}</Container.Body>
    </Container>
  );
};

export default DiscussionContainer;
