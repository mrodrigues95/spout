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
          'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </Listbox.Options>
    </Transition>
  );
};
