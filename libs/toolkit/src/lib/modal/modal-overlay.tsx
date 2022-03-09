import { ComponentProps, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ModalContext, transitions } from './modal';

interface ModalOverlayProps extends ComponentProps<'div'> {}

export const ModalOverlay = ({ className, ...props }: ModalOverlayProps) => {
  const { transition } = useContext(ModalContext)!;

  return (
    <Transition.Child {...transitions[transition!].overlay}>
      <Dialog.Overlay
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm backdrop-filter',
          className,
        )}
        {...props}
      />
    </Transition.Child>
  );
};
