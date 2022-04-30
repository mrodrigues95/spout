import {
  ComponentProps,
  createContext,
  Fragment,
  MutableRefObject,
  ReactNode,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ModalHeader } from './modal-header';
import { ModalFooter } from './modal-footer';
import { ModalContent } from './modal-content';
import { ModalBody } from './modal-body';
import { ModalOverlay } from './modal-overlay';

export interface ModalProps extends ComponentProps<'div'> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  initialFocus?: MutableRefObject<HTMLElement | null>;
}

interface ModalContextType extends Omit<ModalProps, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null);

export const Modal = ({
  isOpen,
  onClose,
  children,
  className,
  initialFocus,
  ...props
}: ModalProps) => {
  console.log(isOpen);
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={clsx(
            'fixed inset-0 z-50 block items-center justify-center sm:flex',
            className,
          )}
          onClose={onClose}
          open={isOpen}
          initialFocus={initialFocus}
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
