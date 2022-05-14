import { ComponentProps, Fragment, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface ModalContentProps extends ComponentProps<'section'> {
  children: ReactNode;
  className?: string;
}

export const ModalContent = ({
  children,
  className,
  ...props
}: ModalContentProps) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Dialog.Panel
        as="section"
        className={twMerge(
          clsx(
            'relative flex h-full max-w-2xl flex-col bg-white text-black shadow-xl sm:h-auto sm:min-w-[28rem] sm:rounded-md',
            className,
          ),
        )}
        {...props}
      >
        {children}
      </Dialog.Panel>
    </Transition.Child>
  );
};
