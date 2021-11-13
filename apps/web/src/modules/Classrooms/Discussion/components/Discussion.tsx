import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import { Layout, Container } from '../../../../shared/components';
import { Card } from '../../../../shared/components';
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

  return (
    <Layout title={data?.discussionById.name ?? 'Discussion'}>
      <Container isLoading={loading} isError={error} refetch={refetch}>
        {data && (
          <>
            <Card className="inline-block w-max mb-2">
              <h1 className="text-3xl text-orange-500 font-semibold">
                {data.discussionById.name}
              </h1>
            </Card>
            <Messages discussionId={data?.discussionById.id} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Discussion;
