import { ComponentProps } from 'react';
import clsx from 'clsx';
import { TableHeader } from './table-header';
import { TableBody } from './table-body';
import { TableColumn } from './table-column';
import { TableRow } from './table-row';
import { TableCell } from './table-cell';

export interface TableProps extends ComponentProps<'table'> {
  containerProps?: ComponentProps<'div'>;
}

export const Table = ({ className, containerProps, ...props }: TableProps) => {
  return (
    <div
      {...containerProps}
      className={clsx(
        'relative w-full overflow-auto rounded-lg shadow-sm ring-2 ring-gray-900/5',
        containerProps?.className,
      )}
    >
      <table
        className={clsx('table w-full table-auto border-collapse', className)}
        {...props}
      />
    </div>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Column = TableColumn;
Table.Row = TableRow;
Table.Cell = TableCell;
