import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <tbody className={clsx('table-row-group', className)} {...props} />;
};
