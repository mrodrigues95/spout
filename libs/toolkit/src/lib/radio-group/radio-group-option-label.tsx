import { ComponentProps } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface RadioGroupOptionLabelProps extends ComponentProps<'p'> {
  disabled?: boolean;
  checked?: boolean;
}

export const RadioGroupOptionLabel = ({
  disabled = false,
  checked = false,
  className,
  ...props
}: RadioGroupOptionLabelProps) => {
  return (
    <RadioGroup.Label
      as="p"
      className={twMerge(
        clsx(
          'flex-1 font-semibold',
          checked ? 'text-gray-900' : 'text-gray-500',
          className,
        ),
      )}
      {...props}
    />
  );
};
