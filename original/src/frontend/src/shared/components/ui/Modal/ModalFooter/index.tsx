import { ReactNode } from 'react';

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return (
    <div className="flex items-center justify-end px-4 py-3 bg-gray-100 rounded-b-md">
      {children}
    </div>
  );
};

export default ModalFooter;
