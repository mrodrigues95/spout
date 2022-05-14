/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { forwardRef, ReactElement, ReactNode, Ref } from 'react';
import { Listbox } from '@headlessui/react';
import { SelectButton } from './select-button';
import { SelectOption } from './select-option';
import { SelectOptions } from './select-options';
import clsx from 'clsx';

export interface SelectProps<T extends unknown = string> {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
  multiple?: boolean;
  className?: string;
}

const BaseSelect = <T extends unknown = string>(
  {
    label,
    value,
    onChange,
    children,
    multiple = false,
    className,
    ...props
  }: SelectProps<T>,
  ref: Ref<HTMLDivElement>,
) => (
  <Listbox
    as="div"
    className={clsx('relative space-y-1.5', className)}
    value={value}
    onChange={onChange}
    multiple={multiple}
    ref={ref}
    {...props}
  >
    {label && (
      <Listbox.Label className="block text-sm font-medium text-gray-900">
        {label}
      </Listbox.Label>
    )}
    {children}
  </Listbox>
);

export const Select = Object.assign(
  forwardRef(BaseSelect) as <T extends unknown = string>(
    props: SelectProps<T> & { ref?: Ref<HTMLDivElement> },
  ) => ReactElement,
  {
    Button: SelectButton,
    Options: SelectOptions,
    Option: SelectOption,
  },
);
