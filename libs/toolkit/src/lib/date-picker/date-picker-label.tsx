import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { DatePickerProps } from './date-picker';
import { FieldError } from '../form';

export interface DatePickerLabelProps
  extends HTMLAttributes<HTMLElement>,
    Pick<DatePickerProps, 'label' | 'errorMessage'> {
  isInvalid?: boolean;
}

export const DatePickerLabel = ({
  errorMessage,
  isInvalid = false,
  ...props
}: DatePickerLabelProps) => {
  return (
    <div
      className={clsx(
        'flex items-center whitespace-pre text-sm font-medium',
        isInvalid ? 'text-red-600' : 'text-gray-900',
      )}
      {...props}
    >
      <span>{props.label}</span>
      {isInvalid && <FieldError error={{ message: errorMessage }} />}
    </div>
  );
};
