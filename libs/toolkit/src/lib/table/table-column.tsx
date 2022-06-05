import { ComponentProps } from 'react';
import { Header } from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export interface TableColumnProps extends ComponentProps<'th'> {
  header: Header<any>;
  isSortable?: boolean;
}

export const TableColumn = ({
  header,
  className,
  children,
  isSortable = false,
  ...props
}: TableColumnProps) => {
  return (
    <th
      className={clsx(
        'table-cell rounded-lg px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600',
        isSortable && header.column.getCanSort()
          ? 'cursor-pointer select-none hover:text-gray-900'
          : '',
        className,
      )}
      colSpan={header.colSpan}
      onClick={isSortable ? header.column.getToggleSortingHandler() : undefined}
      {...props}
    >
      {isSortable ? (
        <div className="flex items-center">
          {children}
          <span className="ml-2">
            {{
              asc: <FontAwesomeIcon icon={faArrowUp} />,
              desc: <FontAwesomeIcon icon={faArrowDown} />,
            }[header.column.getIsSorted() as string] ?? null}
          </span>
        </div>
      ) : (
        children
      )}
    </th>
  );
};
