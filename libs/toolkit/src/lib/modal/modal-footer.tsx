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
        'flex items-center justify-end px-6 py-4 bg-gray-100 rounded-b-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};