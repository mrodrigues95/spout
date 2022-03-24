import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface InputProps extends ComponentProps<'input'> {}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', className, ...props }, ref) => {
    return (
      <input
        className={twMerge(
          clsx(
            'w-full rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none ring-offset-4 transition duration-150 ease-in-out',
            'placeholder-shown:font-normal disabled:opacity-60',
            'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
            className,
          ),
        )}
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
