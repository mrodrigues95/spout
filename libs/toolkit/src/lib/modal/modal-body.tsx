import { ComponentProps, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
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
      className={twMerge(
        clsx('flex flex-col justify-center space-y-3 px-6 pb-4', className),
      )}
      {...props}
    >
      {children}
    </div>
  );
};
