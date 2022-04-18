import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface DividerProps extends ComponentProps<'hr'> {
  vertical?: boolean;
}

export const Divider = ({
  vertical = false,
  className,
  ...props
}: DividerProps) => {
  return (
    <hr
      className={twMerge(
        clsx(
          'my-auto h-2/4 border-l-2 border-gray-300 text-center',
          vertical ? 'my-auto h-2/4 border-l-2' : 'mx-auto w-2/4 border-t-2',
          className,
        ),
      )}
      {...props}
    />
  );
};
