import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface TimelineDotProps extends ComponentProps<'span'> {}

export const TimelineDot = ({ className, ...props }: TimelineDotProps) => {
  return (
    <span
      className={twMerge(
        clsx(
          'my-1 flex self-baseline rounded-full border-none bg-gray-200/75 p-2 text-gray-500 shadow-sm',
          className,
        ),
      )}
      {...props}
    />
  );
};
