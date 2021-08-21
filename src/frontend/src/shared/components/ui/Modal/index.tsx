import { createContext, ReactNode } from 'react';
import { Dialog } from '@headlessui/react';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalContextType extends Omit<Props, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null);

const Modal = ({ isOpen, onClose, children }: Props) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <Dialog
        className="z-50 fixed px-2 pb-4 inset-0 flex items-center justify-center sm:px-4"
        open={isOpen}
        onClose={onClose}
      >
        <Dialog.Overlay className="absolute inset-0 bg-black opacity-25" />
        <div className="relative flex flex-col w-full max-w-lg shadow-xl bg-white rounded-md text-black">
          {children}
        </div>
      </Dialog>
    </ModalContext.Provider>
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
