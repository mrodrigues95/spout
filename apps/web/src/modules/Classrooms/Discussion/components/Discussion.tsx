import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import { Layout, Container } from '../../../../shared/components';
import { ClassroomInfoFragment } from '../../components';
import DiscussionHeader from './DiscussionHeader';
import DiscussionDetails from './DiscussionDetails';
import DiscussionMessages, {
  DiscussionMessagesFragment,
} from './DiscussionMessages';

export const query = gql`
  query DiscussionQuery($id: ID!, $after: String) {
    discussionById(id: $id) {
      id
      name
      classroom {
        ...ClassroomInfo_classroom
      }
      ...DiscussionMessages_discussion
    }
  }
  ${ClassroomInfoFragment}
  ${DiscussionMessagesFragment}
`;

const Discussion = () => {
  const router = useRouter();
  const {
    data,
    loading,
    error,
    refetch,
    subscribeToMore,
    fetchMore,
  } = useQuery<DiscussionQuery>(query, {
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
        horizontal
      >
        {data && (
          <>
            <div className="flex flex-col flex-1 space-y-4">
              <DiscussionHeader discussion={data.discussionById} />
              <DiscussionMessages
                discussion={data.discussionById}
                subscribeToMore={subscribeToMore}
                fetchMore={fetchMore}
              />
            </div>
            <DiscussionDetails discussion={data.discussionById} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Discussion;
