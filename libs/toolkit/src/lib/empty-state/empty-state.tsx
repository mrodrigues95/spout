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
        'flex flex-1 flex-col items-center justify-center space-y-4',
        className,
      )}
      {...props}
    >
      {icon}
      <div>
        <p className="text-center text-lg font-bold text-gray-900">{heading}</p>
        {body && <p className="font-medium text-gray-500">{body}</p>}
      </div>
      {children}
    </div>
  );
};
