import { ComponentProps } from 'react';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface RadioGroupLabelProps extends ComponentProps<'label'> {}

export const RadioGroupLabel = ({
  className,
  ...props
}: RadioGroupLabelProps) => {
  return (
    <RadioGroup.Label
      className={twMerge(clsx('text-sm font-medium text-gray-900', className))}
      {...props}
    />
  );
};
