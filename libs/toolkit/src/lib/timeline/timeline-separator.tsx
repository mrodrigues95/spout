import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TimelineSeparatorProps extends ComponentProps<'div'> {}

export const TimelineSeparator = ({
  className,
  ...props
}: TimelineSeparatorProps) => {
  return (
    <div
      className={twMerge(
        clsx('shrink-1 flex grow-0 flex-col items-center', className),
      )}
      {...props}
    />
  );
};
