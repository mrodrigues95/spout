import { ReactNode, useState } from 'react';
import {
  ErrorBoundary as ReactErrorBoundary,
  ErrorBoundaryProps,
} from 'react-error-boundary';

interface RenderProp {
  fetchKey: number;
}

type Props = {
  children({ fetchKey }: RenderProp): ReactNode;
} & ErrorBoundaryProps;

const ErrorBoundary = ({ children, ...props }: Props) => {
  const [fetchKey, setFetchKey] = useState(0);

  return (
    <ReactErrorBoundary
      {...props}
      onReset={() => setFetchKey((prev) => prev + 1)}
      resetKeys={[fetchKey]}
    >
      {children({ fetchKey })}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
