import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

interface ModalFooterProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export const ModalFooter = ({
  children,
  className,
  ...props
}: ModalFooterProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-end space-x-2 rounded-b-md bg-gray-50 px-6 py-4',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
