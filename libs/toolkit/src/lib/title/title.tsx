import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Title = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleProps<T extends Title = 'h1'> = {
  as?: T;
  variant?: T;
} & ComponentProps<T>;

export const Title = <T extends Title = 'h1'>({
  as,
  variant = as,
  className,
  ...props
}: TitleProps<T>) => {
  const Component = as || 'h1';

  return (
    <Component
      className={twMerge(
        clsx(
          'font-semibold text-gray-900',
          variant === 'h1' && 'text-3xl',
          variant === 'h2' && 'text-2xl',
          variant === 'h3' && 'text-xl',
          variant === 'h4' && 'text-lg',
          variant === 'h5' && 'text-base',
          variant === 'h6' && 'text-sm',
          className,
        ),
      )}
      {...props}
    />
  );
};
