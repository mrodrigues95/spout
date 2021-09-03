import { ComponentProps, createContext, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalFooter from './ModalFooter';

export interface Props extends ComponentProps<'section'> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalContextType extends Omit<Props, 'children'> {}

export const ModalContext = createContext<ModalContextType | null>(null);

const Modal = ({ isOpen, onClose, children, className, ...props }: Props) => {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          className="z-50 fixed inset-0 flex items-center justify-center"
          onClose={onClose}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-black opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <section
              className={clsx(
                'relative flex flex-col max-w-2xl shadow-xl bg-white rounded-md text-black',
                className
              )}
              {...props}
            >
              {children}
            </section>
          </Transition.Child>
        </Dialog>
      </Transition>
    </ModalContext.Provider>
  );
};

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
