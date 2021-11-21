import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import { Layout, Container } from '../../../../shared/components';
import Messages from './Messages';

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

  const title = data?.discussionById.name ?? 'Discussion';

  return (
    <Layout title={title}>
      <Container
        title={title}
        isLoading={loading}
        isError={error}
        refetch={refetch}
      >
        {data && <Messages discussionId={data?.discussionById.id} />}
      </Container>
    </Layout>
  );
};

export default Discussion;
