import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkeletonStackProps extends ComponentProps<'div'> {
  vertical?: boolean;
  children: ReactNode;
}

const SkeletonStack = ({
  vertical = false,
  className,
  children,
  ...props
}: SkeletonStackProps) => {
  return (
    <div
      className={clsx(
        'flex',
        vertical ? 'flex-col space-y-2' : 'flex-row space-x-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface SkeletonProps extends ComponentProps<'div'> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        clsx(
          'h-6 w-full animate-pulse rounded-lg bg-gray-500 bg-opacity-25',
          className
        )
      )}
      {...props}
    />
  );
};

Skeleton.Stack = SkeletonStack;
