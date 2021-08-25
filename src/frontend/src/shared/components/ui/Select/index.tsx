import { ReactNode } from 'react';
import { Listbox } from '@headlessui/react';
import SelectButton from './SelectButton';
import SelectOptions from './SelectOptions';
import SelectOption from './SelectOption';

type Props<T> = {
  value: T;
  onChange: (value: T) => void;
  children: ReactNode;
};

const Select = <T extends unknown>({ value, onChange, children }: Props<T>) => {
  return (
    <Listbox
      as="div"
      className="relative mt-1"
      value={value}
      onChange={onChange}
    >
      {children}
    </Listbox>
  );
};

Select.Button = SelectButton;
Select.Options = SelectOptions;
Select.Option = SelectOption;

export default Select;
