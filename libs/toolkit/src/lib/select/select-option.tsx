import { ComponentProps, ReactElement } from 'react';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

interface SelectOption extends Omit<ComponentProps<'li'>, 'value'> {
  value: unknown;
  label: string;
  selectedIcon: ReactElement;
}

export const SelectOption = ({ value, label, selectedIcon }: SelectOption) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        clsx(
          'cursor-pointer select-none relative py-2 pl-10 pr-4 font-semibold',
          active ? 'bg-gray-100' : 'bg-white',
        )
      }
      value={value}
    >
      {({ selected, active }) => (
        <>
          <span className="block truncate">{label}</span>
          {selected ? (
            <span
              className={clsx(
                'absolute inset-y-0 left-0 flex items-center pl-3',
                active ? 'text-gray-600' : 'text-gray-600',
              )}
            >
              {selectedIcon}
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};
