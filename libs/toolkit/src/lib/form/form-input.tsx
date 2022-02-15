import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';
import { FieldError } from '../form';

export interface FormInputProps extends ComponentProps<'input'> {
  label: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, type = 'text', className, ...props }, ref) => {
    return (
      <label className="flex flex-col items-start justify-center space-y-1">
        <span className="font-semibold">
          {label} <FieldError name={props.name} />
        </span>
        <input
          className={clsx(
            'outline-none w-full rounded-md border-none bg-gray-100 font-medium text-black transition duration-200 ease-in-out placeholder-shown:font-normal focus:ring-2 focus:ring-black',
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
