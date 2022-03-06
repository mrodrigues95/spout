import { Suspense } from 'react';
import { Spinner } from '@spout/toolkit';
import ViewDiscussion from './ViewDiscussion';
import {
  ErrorBoundary,
  ErrorFallback,
  Layout,
} from '../../../shared/components';

const Discussion = () => {
  return (
    <Layout title="Discussion" horizontal>
      <ErrorBoundary
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
      </ErrorBoundary>
    </Layout>
  );
};

export default Discussion;
