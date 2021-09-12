import { ComponentProps, forwardRef } from 'react';
import clsx from 'clsx';
import { FieldError } from '../Form/Form';

export interface Props extends ComponentProps<'input'> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'text', className, ...props }, ref) => {
    return (
      <label className="flex flex-col justify-center items-start space-y-1">
        <span className="font-semibold">
          {label} <FieldError name={props.name} />
        </span>
        <input
          className={clsx(
            'w-full border-none outline-none bg-gray-100 text-black rounded-md font-semibold placeholder-medium placeholder-gray-400 transition ease-in-out duration-200 focus:ring-2 focus:ring-black',
            className
          )}
          type={type}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);

export default Input;
