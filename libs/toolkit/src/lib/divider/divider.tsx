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
    <div
      role="separator"
      aria-orientation={orientation === 'vertical' ? 'vertical' : 'horizontal'}
      className={twMerge(
        clsx(
          'border-gray-300/60 text-center',
          orientation === 'vertical'
            ? 'my-auto h-full border-l-2'
            : 'mx-auto w-full border-b-2',
          className,
        ),
      )}
      {...props}
    ></div>
  );
};
