import { ComponentProps, ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export interface EmptyStateProps extends ComponentProps<'div'> {
  heading: string;
  icon: ReactElement;
  body?: string;
  children?: ReactNode;
}

export const EmptyState = ({
  heading,
  body,
  icon,
  children,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={clsx(
        'flex flex-1 flex-col justify-center items-center space-y-4',
        className
      )}
      {...props}
    >
      {icon}
      <p className="font-bold text-gray-900 uppercase">{heading}</p>
      {body && <p className="font-medium text-gray-500">{body}</p>}
      {children}
    </div>
  );
};
