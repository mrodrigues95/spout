import { ComponentProps, ReactNode, useContext } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { ModalContext, transitions } from './modal';

interface ModalContentProps extends ComponentProps<'section'> {
  children: ReactNode;
  className?: string;
}

export const ModalContent = ({
  children,
  className,
  ...props
}: ModalContentProps) => {
  const { transition } = useContext(ModalContext)!;

  return (
    <Transition.Child {...transitions[transition!].content}>
      <section
        className={clsx(
          'relative flex max-w-2xl flex-col rounded-md bg-white text-black shadow-xl',
          className,
        )}
        {...props}
      >
        {children}
      </section>
    </Transition.Child>
  );
};
