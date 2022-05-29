import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Spinner } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import ActivityList from './ActivityList';
import ForbiddenOrNotFoundClassroom from '../ForbiddenOrNotFoundClassroom';
import { ActivityQuery } from './__generated__/ActivityQuery.graphql';

const query = graphql`
  query ActivityQuery($id: ID!) {
    classroomById(id: $id) {
      ...ActivityList_classroom
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Activity = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ActivityQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey, fetchPolicy: 'store-and-network' },
  );

  if (!data.classroomById) {
    return <ForbiddenOrNotFoundClassroom />;
  }

  return <ActivityList classroom={data.classroomById} />;
};

const ActivityWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load the activity for this classroom."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Activity fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default ActivityWithSuspense;
