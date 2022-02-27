import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';
import { FieldError } from '../form';

export interface FormInputProps extends ComponentProps<'input'> {
  label: string;
  isHiddenLabel?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, type = 'text', isHiddenLabel = false, className, ...props },
    ref,
  ) => {
    return (
      <label className="flex flex-col items-start justify-center space-y-1">
        <span className={clsx('font-medium', isHiddenLabel && 'sr-only')}>
          {label} <FieldError name={props.name} />
        </span>
        <input
          className={clsx(
            'outline-none w-full rounded-lg border-2 border-transparent bg-gray-100 font-medium text-black transition duration-200 ease-in-out',
            'ring-offset-4 placeholder-shown:font-normal focus:border-blue-700 focus:ring-2 focus:ring-blue-200',
            className,
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
