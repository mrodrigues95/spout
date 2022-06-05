import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface TableHeaderProps extends ComponentProps<'thead'> {}

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return (
    <thead
      className={clsx(
        'table-header-group border-b border-gray-200 bg-gray-50',
        className,
      )}
      {...props}
    />
  );
};
