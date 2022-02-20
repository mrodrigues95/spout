/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import { SelectButton } from './select-button';
import { SelectOption } from './select-option';
import { SelectOptions } from './select-options';

export interface SelectProps<T extends unknown = string> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
}

export const Select = <T extends unknown = string>({
  label,
  value,
  onChange,
  children,
  ...props
}: SelectProps<T>) => {
  return (
    <Listbox
      as="div"
      className="relative space-y-1"
      value={value}
      onChange={onChange}
      {...props}
    >
      {label && (
        <Listbox.Label className="text-sm font-semibold uppercase text-gray-500">
          {label}
        </Listbox.Label>
      )}
      {children}
    </Listbox>
  );
};

Select.Button = SelectButton;
Select.Options = SelectOptions;
Select.Option = SelectOption;
