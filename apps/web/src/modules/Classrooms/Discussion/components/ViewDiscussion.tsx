import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Layout, Container, Card } from '../../../../shared/components';
import DiscussionHeader from './DiscussionHeader';
import DiscussionDetails from './DiscussionDetails';
import DiscussionMessagesList from './DiscussionMessages/DiscussionMessagesList';
import DiscussionMessageComposer from './DiscussionMessages/DiscussionMessageComposer';
import { ViewDiscussionQuery } from './__generated__/ViewDiscussionQuery.graphql';

export const query = graphql`
  query ViewDiscussionQuery($id: ID!, $count: Int!, $cursor: String) {
    discussionById(id: $id) {
      id
      ...DiscussionHeader_discussion
      ...DiscussionDetails_discussion
      ...DiscussionMessagesList_discussion
        @arguments(count: $count, cursor: $cursor)
      ...DiscussionMessageComposer_discussion
    }
    me {
      ...DiscussionMessagesList_user
      ...DiscussionMessageComposer_user
    }
  }
`;

const ViewDiscussion = () => {
  const router = useRouter();
  const data = useLazyLoadQuery<ViewDiscussionQuery>(
    query,
    {
      id: router.query.discussionId as string,
      count: 50,
    },
    { fetchPolicy: 'store-and-network' }
  );

  const title = 'test';
  
  return (
    <Layout title={title}>
      <Container title={title} isLoading={false} isError={false} horizontal>
        <div className="flex flex-col flex-1 space-y-4">
          <DiscussionHeader discussion={data.discussionById} />
          <div className="flex flex-col flex-1 space-y-3">
            <Card className="p-0 relative flex flex-col flex-1 rounded-xl bg-indigo-50/40">
              <div className="absolute inset-0 w-full h-full bg-messages opacity-[7%]" />
              <DiscussionMessagesList
                key={data.discussionById.id}
                discussion={data.discussionById}
                user={data.me!}
              />
            </Card>
            <Card className="p-0">
              <DiscussionMessageComposer
                discussion={data.discussionById}
                user={data.me!}
              />
            </Card>
          </div>
        </div>
        <DiscussionDetails discussion={data.discussionById} />
      </Container>
    </Layout>
  );
};

export default ViewDiscussion;
