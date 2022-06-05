import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr className={clsx('table-row outline-none', className)} {...props} />
  );
};
