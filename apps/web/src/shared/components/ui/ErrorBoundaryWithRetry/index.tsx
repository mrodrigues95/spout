import { ReactNode, useState } from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary';

interface RenderProp {
  fetchKey: number;
}

type Props = {
  children({ fetchKey }: RenderProp): ReactNode;
} & ErrorBoundaryProps;

const ErrorBoundaryWithRetry = ({ children, ...props }: Props) => {
  const [fetchKey, setFetchKey] = useState(0);

  return (
    <ErrorBoundary
      {...props}
      onReset={() => setFetchKey((prev) => prev + 1)}
      resetKeys={[fetchKey]}
    >
      {children({ fetchKey })}
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWithRetry;
