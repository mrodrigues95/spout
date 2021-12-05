import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { EmptyState, EmptyStateProps, Button } from '@spout/toolkit';

export interface Props extends Omit<EmptyStateProps, 'heading' | 'icon'> {
  action: () => void;
  heading?: string;
  icon?: ReactElement;
}

const ErrorFallback = ({ icon, heading, action, ...props }: Props) => {
  return (
    <EmptyState
      heading={heading ? heading : 'Something went wrong'}
      icon={
        icon ? (
          icon
        ) : (
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="h-8 w-8 text-red-600"
          />
        )
      }
      {...props}
    >
      <Button scheme="red" className="text-sm" onClick={() => action()}>
        Try again
      </Button>
    </EmptyState>
  );
};

export default ErrorFallback;
