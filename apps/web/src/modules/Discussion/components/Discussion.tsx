import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { Spinner } from '@spout/toolkit';
import { DiscussionQuery } from '../components/__generated__/Discussion.generated';
import { Layout, ErrorFallback, Container } from '../../../shared/components';
import DiscussionContainer from './DiscussionContainer';

const query = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
    }
  }
`;

const Discussion = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(query, {
    variables: { id: router.query.discussionId as string },
  });

  return (
    <Layout title={data?.discussionById.name ?? 'Discussion'}>
      {loading && <Spinner size="sm" />}
      {error && (
        <Container>
          <Container.Header />
          <ErrorFallback
            icon={<FeelingBlueIllustration className="w-full h-64" />}
            heading="Sorry, we can't load this discussion right now."
            action={refetch}
          />
        </Container>
      )}
      {data && <DiscussionContainer discussion={data.discussionById} />}
    </Layout>
  );
};

export default Discussion;
