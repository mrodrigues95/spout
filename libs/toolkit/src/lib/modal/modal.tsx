import { ComponentProps, createContext, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ModalHeader } from './modal-header';
import { ModalFooter } from './modal-footer';
import { ModalContent } from './modal-content';
import { ModalBody } from './modal-body';
import { ModalOverlay } from './modal-overlay';

export const transitions = {
  scale: {
    overlay: {
      as: Fragment,
      enter: 'ease-out duration-300',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'ease-in duration-200',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
    content: {
      as: Fragment,
      enter: 'ease-out duration-300',
      enterFrom: 'opacity-0 scale-95',
      enterTo: 'opacity-100 scale-100',
      leave: 'ease-in duration-200',
      leaveFrom: 'opacity-100 scale-100',
      leaveTo: 'opacity-0 scale-95',
    },
  },
};

export interface ModalProps extends ComponentProps<'div'> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  transition?: keyof typeof transitions;
}

interface ModalContextType extends Omit<ModalProps, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null);

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  transition = 'scale',
  ...props
}: ModalProps) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose, transition }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="z-50 fixed inset-0 flex items-center justify-center"
          onClose={onClose}
          {...props}
        >
          {children}
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Overlay = ModalOverlay;
