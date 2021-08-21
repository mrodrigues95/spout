import { ReactNode } from 'react';

interface ModalFooterProps {
  children: ReactNode;
}

const ModalFooter = ({ children }: ModalFooterProps) => {
  return <div>{children}</div>;
};

export default ModalFooter;
