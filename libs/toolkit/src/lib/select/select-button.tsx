import { ReactElement } from 'react';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

const labelVariants = {
  default: 'text-black font-semibold',
  placeholder: 'text-gray-400 font-medium',
};

interface Props {
  label: string;
  variant?: keyof typeof labelVariants;
  icon?: ReactElement;
}

export const SelectButton = ({ label, variant = 'default', icon }: Props) => {
  const labelVariant = labelVariants[variant];

  return (
    <Listbox.Button className="relative w-full p-3 ring-2 ring-black ring-opacity-5 text-left bg-white rounded cursor-default transition ease-in-out duration-150 hover:ring-opacity-100 focus:outline-none focus-visible:ring-opacity-100">
      <span className={clsx('block truncate', labelVariant)}>{label}</span>
      {icon && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer">
          {icon}
        </span>
      )}
    </Listbox.Button>
  );
};
