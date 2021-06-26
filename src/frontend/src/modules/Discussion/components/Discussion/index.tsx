import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { PrimaryLayout } from '~/shared/components';
import DiscussionContainer from '../DiscussionContainer';
import { DiscussionQuery } from './__generated__/index.generated';

export const DISCUSSION_QUERY = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      name
      users {
        name
      }
    }
  }
`;

const Discussion = () => {
  const router = useRouter();
  const { data } = useQuery<DiscussionQuery>(DISCUSSION_QUERY, {
    variables: { id: router.query.discussionId },
  });

  return (
    <PrimaryLayout title={data?.discussionById.name ?? 'Discussion'}>
      <DiscussionContainer />
    </PrimaryLayout>
  );
};

export default Discussion;
