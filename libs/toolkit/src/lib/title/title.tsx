import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Title = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type TitleProps<T extends Title = 'h1'> = {
  as?: T;
} & ComponentProps<T>;

export const Title = <T extends Title = 'h1'>({
  as,
  className,
  ...props
}: TitleProps<T>) => {
  const Component = as || 'h1';

  return (
    <Component
      className={twMerge(clsx(
        'text-blueGray-900 font-bold',
        as === 'h1' && 'text-4xl',
        as === 'h2' && 'text-3xl',
        as === 'h3' && 'text-xl',
        as === 'h4' && 'text-lg',
        as === 'h5' && 'text-base',
        as === 'h6' && 'text-sm',
        className
      ))}
      {...props}
    />
  );
};
