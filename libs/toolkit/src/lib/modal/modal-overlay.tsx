import { ComponentProps, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';

interface ModalOverlayProps extends ComponentProps<'div'> {}

export const ModalOverlay = ({ className, ...props }: ModalOverlayProps) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm backdrop-filter',
          className,
        )}
        {...props}
      />
    </Transition.Child>
  );
};
