import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface TableCellProps extends ComponentProps<'td'> {}

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return (
    <td
      className={clsx(
        'table-cell whitespace-nowrap rounded-lg px-6 py-3 text-gray-600 first:font-medium first:text-gray-900',
        className,
      )}
      {...props}
    />
  );
};
