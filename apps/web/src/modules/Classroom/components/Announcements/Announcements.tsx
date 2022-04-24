import { Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner, Title, Text } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import AnnouncementsList from './AnnouncementsList';
import CreateAnnouncement from './CreateAnnouncement';
import { AnnouncementsQuery } from './__generated__/AnnouncementsQuery.graphql';

const query = graphql`
  query AnnouncementsQuery($id: ID!, $count: Int!, $cursor: String) {
    classroomById(id: $id) {
      ...CreateAnnouncement_classroom
      ...AnnouncementsList_classroom @arguments(count: $count, cursor: $cursor)
    }
  }
`;

interface Props {
  fetchKey: number;
}

// TODO: Implement sorting.
// TODO: Implement date dividers, similar to discussion messages.
const Announcements = ({ fetchKey }: Props) => {
  const router = useRouter();
  const [isComposingAnnouncement, setIsComposingAnnouncement] = useState(false);
  const data = useLazyLoadQuery<AnnouncementsQuery>(
    query,
    {
      id: router.query.classroomId as string,
      count: 50,
    },
    { fetchKey },
  );

  return (
    <article className="flex h-full flex-col space-y-6">
      <div className="!-mt-1.5 flex items-center justify-between">
        <div>
          <Title as="h2" variant="h4">
            Announcements
          </Title>
          <Text size="sm">Manage your announcements</Text>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setIsComposingAnnouncement(true)}
        >
          New
        </Button>
      </div>
      {isComposingAnnouncement && (
        <CreateAnnouncement
          classroom={data.classroomById}
          onEditorClose={() => setIsComposingAnnouncement(false)}
        />
      )}
      <AnnouncementsList
        isComposingAnnouncement={isComposingAnnouncement}
        classroom={data.classroomById}
      />
    </article>
  );
};

const AnnouncementsWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load any announcements for this classroom."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Announcements fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default AnnouncementsWithSuspense;
