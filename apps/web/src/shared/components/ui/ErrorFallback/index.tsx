import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {
  EmptyState,
  EmptyStateProps,
  Button,
  ButtonOrLinkProps,
} from '@spout/toolkit';

export interface Props extends Omit<EmptyStateProps, 'heading' | 'icon'> {
  action: () => void;
  heading?: string;
  icon?: ReactElement;
  buttonProps?: ButtonOrLinkProps;
}

const ErrorFallback = ({
  icon,
  heading,
  action,
  buttonProps,
  ...props
}: Props) => {
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
      <Button className="text-sm" onClick={() => action()} {...buttonProps}>
        Try again
      </Button>
    </EmptyState>
  );
};

export default ErrorFallback;
