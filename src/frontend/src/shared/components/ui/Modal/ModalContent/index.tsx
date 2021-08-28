import { ReactNode } from 'react';

interface ModalContentProps {
  children: ReactNode;
}

const ModalContent = ({ children }: ModalContentProps) => {
  return (
    <div className="flex flex-col justify-center px-4 py-5">{children}</div>
  );
};

export default ModalContent;
