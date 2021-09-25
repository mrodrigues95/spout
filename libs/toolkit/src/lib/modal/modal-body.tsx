import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

interface ModalBodyProps extends ComponentProps<'div'> {
  children: ReactNode;
}

export const ModalBody = ({
  children,
  className,
  ...props
}: ModalBodyProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center px-6 pb-4 space-y-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
