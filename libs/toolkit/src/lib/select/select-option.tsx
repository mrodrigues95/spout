import { ComponentProps, ReactElement, ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

interface SelectOptionProps extends Omit<ComponentProps<'li'>, 'value'> {
  value: unknown;
  label: ReactNode;
  selectedIcon?: ReactElement;
}

export const SelectOption = ({
  value,
  label,
  selectedIcon = <FontAwesomeIcon icon={faCheck} />,
  ...props
}: SelectOptionProps) => {
  return (
    <Listbox.Option
      className={({ active }) =>
        clsx(
          'relative cursor-pointer select-none py-2 pl-9 pr-4 focus:outline-none',
          active ? 'bg-gray-100' : 'bg-white',
        )
      }
      value={value}
      {...props}
    >
      {({ selected, active }) => (
        <>
          <span className="block truncate text-sm">{label}</span>
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
