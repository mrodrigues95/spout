import { useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Card, Header, Main } from '../../../shared/components';
import { ForbiddenOrNotFoundClassroom } from '../../Classroom';
import DiscussionHeader from './DiscussionHeader';
import DiscussionDetails from './DiscussionDetails';
import DiscussionMessagesList from './DiscussionMessages/DiscussionMessagesList';
import DiscussionMessageComposer from './DiscussionMessages/DiscussionMessageComposer';
import { DiscussionProvider } from './DiscussionProvider';
import { ViewDiscussionQuery } from './__generated__/ViewDiscussionQuery.graphql';

const query = graphql`
  query ViewDiscussionQuery(
    $discussionId: ID!
    $classroomId: ID!
    $count: Int!
    $cursor: String
  ) {
    discussionById(id: $discussionId) {
      id
      name
      ...DiscussionHeader_discussion
      ...DiscussionDetails_discussion
      ...DiscussionMessagesList_discussion
        @arguments(count: $count, cursor: $cursor)
      ...DiscussionMessageComposer_discussion
    }
    me {
      ...DiscussionMessagesList_user @arguments(classroomId: $classroomId)
      ...DiscussionMessageComposer_user
      ...DiscussionDetails_user @arguments(classroomId: $classroomId)
    }
  }
`;

interface Props {
  fetchKey: number;
}

const ViewDiscussion = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ViewDiscussionQuery>(
    query,
    {
      discussionId: router.query.discussionId as string,
      classroomId: router.query.classroomId as string,
      count: 50,
    },
    { fetchPolicy: 'store-and-network', fetchKey },
  );

  const [showDetails, setShowDetails] = useState(false);

  if (!data.discussionById) {
    return <ForbiddenOrNotFoundClassroom />;
  }

  return (
    <DiscussionProvider
      showDetails={showDetails}
      setShowDetails={setShowDetails}
    >
      <NextSeo title={data.discussionById.name} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header>
          <DiscussionHeader discussion={data.discussionById} />
        </Header>
        <Main className="flex flex-1 flex-col space-y-2">
          <article className="flex flex-1 flex-col space-y-3">
            <Card className="relative flex flex-1 flex-col rounded-xl bg-indigo-50/40 p-0">
              <div className="bg-messages absolute inset-0 h-full w-full opacity-[7%]" />
              <DiscussionMessagesList
                key={data.discussionById.id}
                discussion={data.discussionById}
                me={data.me!}
              />
            </Card>
            <Card className="p-0">
              <DiscussionMessageComposer
                discussion={data.discussionById}
                me={data.me!}
              />
            </Card>
          </article>
        </Main>
      </div>
      <DiscussionDetails discussion={data.discussionById} me={data.me!} />
    </DiscussionProvider>
  );
};

export default ViewDiscussion;
