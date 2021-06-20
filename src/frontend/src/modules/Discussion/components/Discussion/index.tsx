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
  const result = useQuery<DiscussionQuery>(DISCUSSION_QUERY, {
    variables: { id: router.query.discussionId },
    skip: !router.isReady,
  });

  return (
    <PrimaryLayout title={result.data?.discussionById.name ?? 'Discussion'}>
      <DiscussionContainer queryResult={result} />
    </PrimaryLayout>
  );
};

export default Discussion;
