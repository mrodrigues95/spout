import { ComponentProps, forwardRef, ReactElement, Ref } from 'react';
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import { RadioGroupOptionDescription } from './radio-group-option-description';
import { RadioGroupLabel } from './radio-group-label';
import { RadioGroupOptionLabel } from './radio-group-option-label';
import { RadioGroupOption } from './radio-group-option';
import { RadioGroupOptions } from './radio-group-options';

export interface RadioGroupProps<T = unknown>
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  value: T;
  onChange(value: T): void;
  disabled?: boolean;
  name?: string;
}

const BaseRadioGroup = <T extends unknown = unknown>(
  { ...props }: RadioGroupProps<T>,
  ref: Ref<HTMLDivElement>,
) => <HeadlessRadioGroup {...props} ref={ref} />;

export const RadioGroup = Object.assign(
  forwardRef(BaseRadioGroup) as <T extends unknown = unknown>(
    p: RadioGroupProps<T> & { ref?: Ref<HTMLDivElement> },
  ) => ReactElement,
  {
    Options: RadioGroupOptions,
    Option: RadioGroupOption,
    OptionLabel: RadioGroupOptionLabel,
    OptionDescription: RadioGroupOptionDescription,
    Label: RadioGroupLabel,
  },
);
