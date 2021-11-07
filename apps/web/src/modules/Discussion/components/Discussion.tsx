import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { Spinner } from '@spout/toolkit';
import { DiscussionQuery } from '../components/__generated__/Discussion.generated';
import { Layout, ErrorFallback, Container } from '../../../shared/components';
import DiscussionContainer from './DiscussionContainer';
import { Card } from '../../../shared/components';
import Messages from './Messages';

const query = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
    }
  }
`;

// TODO: Handle loading and error states in `Layout`.
const Discussion = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(query, {
    variables: { id: router.query.discussionId as string },
  });

  return (
    <Layout title={data?.discussionById.name ?? 'Discussion'}>
      {data && (
        <>
          <Layout.Column main>
            <Messages discussionId={data?.discussionById.id} />
          </Layout.Column>
          <Layout.Column>
            <Card className="inline-flex flex-col space-y-2">
              <div>
                <p className="text-gray-500 font-medium text-sm">
                  Classroom <span className="text-gray-300 mx-1">/</span>{' '}
                  Discussion
                </p>
              </div>
              <h1 className="text-orange-600 text-3xl font-semibold">
                {data.discussionById.name}
              </h1>
            </Card>
            <Card className="w-96 h-96">asd</Card>
            <Card className="w-96 h-full">asd</Card>
          </Layout.Column>
        </>
      )}
      {/* <Messages discussionId={discussion.id} /> */}
      {/* {loading && <Spinner size="sm" />}
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
      {data && <DiscussionContainer discussion={data.discussionById} />} */}
    </Layout>
  );
};

export default Discussion;
