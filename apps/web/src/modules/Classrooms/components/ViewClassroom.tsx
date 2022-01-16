import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Layout, Container } from '../../../shared/components';
import ClassroomOverviewProvider from './ClassroomOverview/ClassroomOverviewProvider';
import DiscussionsNavigation from './ClassroomOverview/DiscussionsNavigation';
import { ViewClassroomQuery } from './__generated__/ViewClassroomQuery.graphql';

const query = graphql`
  query ViewClassroomQuery($id: ID!) {
    classroomById(id: $id) {
      name
      ...DiscussionsNavigation_discussions
    }
  }
`;

const ViewClassroom = () => {
  const router = useRouter();
  const data = useLazyLoadQuery<ViewClassroomQuery>(query, {
    id: router.query.classroomId as string,
  });

  const title = 'test';

  return (
    <Layout title={title}>
      <Container title={title} isLoading={false} isError={false}>
        <ClassroomOverviewProvider>
          <DiscussionsNavigation classroom={data.classroomById} />
          {/* <div className="flex mt-3 space-x-3">
            <div className="flex-1 space-y-3">
              <div className="flex space-x-3">
                <Settings />
                <Invite classroom={classroom} />
              </div>
              <div>
                <Announcements />
              </div>
              <div className="flex space-x-3">
                <Upcoming />
                <Instructor classroom={classroom} />
              </div>
            </div>
            <Participants classroom={classroom} />
          </div> */}
        </ClassroomOverviewProvider>
      </Container>
    </Layout>
  );
};

export default ViewClassroom;
