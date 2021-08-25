import { Fragment, ReactNode } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface Props {
  children: ReactNode;
}

const SelectOptions = ({ children }: Props) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 focus:outline-none">
        {children}
      </Listbox.Options>
    </Transition>
  );
};

export default SelectOptions;
