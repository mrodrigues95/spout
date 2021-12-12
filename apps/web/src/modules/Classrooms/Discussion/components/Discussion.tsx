import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import { Layout, Container } from '../../../../shared/components';
import Messages from './Messages';
import DiscussionHeader from './DiscussionHeader';
import DiscussionDetails from './DiscussionDetails';
import { UserInfoFragment } from '../utils/fragments';

// TODO: Move query from `messages` here.
// TODO: Create welcome message.
const DiscussionFragment = gql`
  fragment DiscussionInfo_discussion on Discussion {
    id
    name
    classroom {
      id
      name
      users {
        ...UserInfo_user
      }
      discussions {
        id
        name
      }
    }
  }
  ${UserInfoFragment}
`;

const query = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      ...DiscussionInfo_discussion
    }
  }
  ${DiscussionFragment}
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
        horizontal
      >
        {data && (
          <>
            <div className="flex flex-col flex-1 space-y-4">
              <DiscussionHeader discussion={data.discussionById} />
              <Messages discussionId={data.discussionById.id} />
            </div>
            <DiscussionDetails discussion={data.discussionById} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Discussion;
