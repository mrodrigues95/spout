import { forwardRef, HTMLAttributes, RefObject } from 'react';
import clsx from 'clsx';
import { DatePickerProps } from './date-picker';
import { FieldError } from '../form';

export interface DatePickerLabelProps
  extends HTMLAttributes<HTMLElement>,
    Pick<DatePickerProps, 'label' | 'errorMessage'> {
  isError?: boolean;
}

export const DatePickerLabel = forwardRef<HTMLElement, DatePickerLabelProps>(
  ({ errorMessage, isError = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref as RefObject<HTMLDivElement>}
        className="relative inline-flex w-full flex-col space-y-1.5 text-left"
      >
        <div
          className={clsx(
            'flex items-center whitespace-pre text-sm font-medium',
            isError ? 'text-red-600' : 'text-gray-900',
          )}
          {...props}
        >
          <span>{props.label}</span>
          {isError && <FieldError error={{ message: errorMessage }} />}
        </div>
        {children}
      </div>
    );
  },
);
