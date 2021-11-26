import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { EmptyState, EmptyStateProps } from '@spout/toolkit';

interface Props extends Omit<EmptyStateProps, 'heading' | 'icon'> {
  heading?: string;
  icon?: ReactElement;
}

const EmptyFallback = ({ icon, heading, body }: Props) => {
  return (
    <EmptyState
      heading={heading ? heading : "There's nothing here, yet"}
      body={body}
      icon={
        icon ? (
          icon
        ) : (
          <FontAwesomeIcon
            icon={faHandSparkles}
            className="h-12 w-12 text-black"
          />
        )
      }
    />
  );
};

export default EmptyFallback;
