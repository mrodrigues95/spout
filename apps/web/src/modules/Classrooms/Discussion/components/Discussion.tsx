import { Suspense } from 'react';
import { Spinner } from '@spout/toolkit';
import ViewDiscussion from './ViewDiscussion';
import {
  ErrorBoundaryWithRetry,
  ErrorFallback,
  Layout,
} from '../../../../shared/components';

const Classrooms = () => {
  return (
    <Layout title="Discussion">
      <ErrorBoundaryWithRetry
        FallbackComponent={({ resetErrorBoundary }) => (
          <ErrorFallback
            heading="We couldn't load this discussion"
            action={resetErrorBoundary}
          />
        )}
      >
        {({ fetchKey }) => (
          <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
            <ViewDiscussion fetchKey={fetchKey} />
          </Suspense>
        )}
      </ErrorBoundaryWithRetry>
    </Layout>
  );
};

export default Classrooms;
