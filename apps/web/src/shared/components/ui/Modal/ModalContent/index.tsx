import clsx from 'clsx';
import { ReactNode } from 'react';

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

const ModalContent = ({ children, className }: ModalContentProps) => {
  return (
    <div className={clsx('flex flex-col justify-center px-4 py-5 space-y-3', className)}>
      {children}
    </div>
  );
};

export default ModalContent;
