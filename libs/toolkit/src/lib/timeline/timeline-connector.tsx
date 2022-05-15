import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TimelineConnectorProps extends ComponentProps<'span'> {}

export const TimelineConnector = ({
  className,
  ...props
}: TimelineConnectorProps) => {
  return (
    <span
      className={twMerge(clsx('w-0.5 flex-1 bg-gray-100', className))}
      {...props}
    />
  );
};
