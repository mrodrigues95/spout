import { ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import SelectButton from './SelectButton';
import SelectOptions from './SelectOptions';
import SelectOption from './SelectOption';

type Props<T> = {
  label?: string;
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
};

// TODO: Use `forwardRef` here for uncontrolled support.
const Select = <T extends unknown>({
  label,
  value,
  onChange,
  children,
  ...props
}: Props<T>) => {
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

export default Select;
