import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface SkeletonStackProps extends ComponentProps<'div'> {
  space?: string;
  children: ReactNode;
}

const SkeletonStack = ({
  space = 'space-y-2',
  className,
  children,
  ...props
}: SkeletonStackProps) => {
  return (
    <div className={clsx('flex flex-col', space, className)} {...props}>
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
          'bg-gray-500 bg-opacity-25 h-6 w-full rounded-lg animate-pulse',
          className
        )
      )}
      {...props}
    />
  );
};

Skeleton.Stack = SkeletonStack;
