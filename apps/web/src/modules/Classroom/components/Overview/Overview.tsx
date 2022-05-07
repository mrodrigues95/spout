import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Spinner } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import Header from './Header';
import { Syllabus } from './Syllabus';
import { OverviewQuery } from './__generated__/OverviewQuery.graphql';

const query = graphql`
  query OverviewQuery($id: ID!) {
    classroomById(id: $id) {
      syllabus {
        content
      }
      ...Header_classroom
      ...Syllabus_classroom
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Overview = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<OverviewQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey },
  );

  return (
    <div className="flex flex-col space-y-4">
      <Header classroom={data.classroomById} />
      <Syllabus classroom={data.classroomById} />
    </div>
  );
};

const OverviewWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load the overview for this classroom."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Overview fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default OverviewWithSuspense;
