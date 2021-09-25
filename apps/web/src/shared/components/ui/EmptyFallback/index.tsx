import { ReactElement } from 'react';
import { SparklesIcon } from '@spout/shared/assets';
import { EmptyState, EmptyStateProps } from '@spout/toolkit';

interface Props extends Omit<EmptyStateProps, 'heading' | 'icon'> {
  heading?: string;
  icon?: ReactElement;
}

const EmptyFallback = ({ icon, heading, body }: Props) => {
  return (
    <EmptyState
      heading={heading ? heading : "There's nothing here, yet."}
      body={body}
      icon={icon ? icon : <SparklesIcon className="h-12 w-12 text-black" />}
    />
  );
};

export default EmptyFallback;
