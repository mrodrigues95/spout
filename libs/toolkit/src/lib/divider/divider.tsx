import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface DividerProps extends ComponentProps<'hr'> {
  orientation?: 'vertical' | 'horizontal';
}

export const Divider = ({
  orientation = 'horizontal',
  className,
  ...props
}: DividerProps) => {
  return (
    <hr
      className={twMerge(
        clsx(
          'border-gray-300/60 text-center',
          orientation === 'vertical'
            ? 'my-auto h-full border-l'
            : 'mx-auto w-full border-b',
          className,
        ),
      )}
      {...props}
    />
  );
};
