import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface TimelineContentProps extends ComponentProps<'div'> {}

export const TimelineContent = ({
  className,
  ...props
}: TimelineContentProps) => {
  return (
    <div
      className={clsx('flex-1 px-4 text-left leading-6', className)}
      {...props}
    />
  );
};
