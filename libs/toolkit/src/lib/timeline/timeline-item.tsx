import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TimelineItemProps extends ComponentProps<'li'> {}

export const TimelineItem = ({ className, ...props }: TimelineItemProps) => {
  return (
    <li
      className={twMerge(
        clsx('relative flex min-h-[5rem] list-none', className),
      )}
      {...props}
    />
  );
};
