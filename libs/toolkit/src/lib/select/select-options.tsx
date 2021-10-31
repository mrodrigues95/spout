import { ComponentProps, Fragment, ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';

interface SelectOptionsProps extends ComponentProps<'ul'> {
  children: ReactNode;
}

export const SelectOptions = ({
  children,
  className,
  ...props
}: SelectOptionsProps) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options
        className={clsx(
          'z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </Listbox.Options>
    </Transition>
  );
};
