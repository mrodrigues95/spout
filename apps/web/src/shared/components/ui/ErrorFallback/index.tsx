import { ReactElement } from 'react';
import { SparklesIcon } from '@spout/assets/icons/outline';
import { EmptyState, EmptyStateProps, Button } from '@spout/toolkit';

interface Props extends Omit<EmptyStateProps, 'heading' | 'icon'> {
  action: () => void;
  heading?: string;
  icon?: ReactElement;
}

const ErrorFallback = ({ icon, heading, action }: Props) => {
  return (
    <EmptyState
      heading={heading ? heading : 'Something went wrong.'}
      icon={icon ? icon : <SparklesIcon className="h-12 w-12 text-gray-500" />}
    >
      <Button className="text-sm" rounded="md" onClick={() => action()}>
        Try again
      </Button>
    </EmptyState>
  );
};

export default ErrorFallback;
