import { ComponentProps } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

export interface RadioGroupOptionDescriptionProps extends ComponentProps<'p'> {
  disabled?: boolean;
  checked?: boolean;
}

export const RadioGroupOptionDescription = ({
  disabled = false,
  checked = false,
  className,
  ...props
}: RadioGroupOptionDescriptionProps) => {
  return (
    <RadioGroup.Description
      as="span"
      className={clsx(checked ? 'text-gray-700' : 'text-gray-500', className)}
      {...props}
    />
  );
};
