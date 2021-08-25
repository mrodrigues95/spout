import { ReactElement } from 'react';
import { Listbox } from '@headlessui/react';

interface Props {
  label: string;
  icon?: ReactElement;
}

const SelectButton = ({ label, icon }: Props) => {
  return (
    <Listbox.Button className="relative w-full p-3 ring-2 ring-black ring-opacity-5 text-left bg-white rounded cursor-default transition ease-in-out duration-150 hover:ring-opacity-100 focus:outline-none focus-visible:ring-opacity-100">
      <span className="block font-semibold text-black truncate">{label}</span>
      {icon && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
          {icon}
        </span>
      )}
    </Listbox.Button>
  );
};

export default SelectButton;
