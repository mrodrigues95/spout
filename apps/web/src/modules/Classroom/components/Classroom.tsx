import { Suspense } from 'react';
import { Spinner } from '@spout/toolkit';
import {
  Layout,
  ErrorBoundary,
  ErrorFallback,
} from '../../../shared/components';
import ViewClassroom from './ViewClassroom';

const Classrooms = () => {
  return (
    <Layout title="Classroom" horizontal>
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <ErrorFallback
            heading="We couldn't load this classroom."
            action={resetErrorBoundary}
          />
        )}
      >
        {({ fetchKey }) => (
          <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
            <ViewClassroom fetchKey={fetchKey} />
          </Suspense>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export default Classrooms;
