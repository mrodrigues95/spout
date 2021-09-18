import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

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
    <div className={clsx('py-2 flex flex-col', space, className)} {...props}>
      {children}
    </div>
  );
};

export interface SkeletonProps extends ComponentProps<'div'> {
  h?: string;
  w?: string;
}

export const Skeleton = ({
  h = 'h-6',
  w = 'w-full',
  className,
  ...props
}: SkeletonProps) => {
  return (
    <div
      className={clsx(
        'bg-gray-500 bg-opacity-25 rounded-lg animate-pulse',
        h,
        w,
        className
      )}
      {...props}
    />
  );
};

Skeleton.Stack = SkeletonStack;
