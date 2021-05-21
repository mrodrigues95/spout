import { ComponentProps, forwardRef } from 'react';
import { FieldError } from '../Form/Form';

interface Props extends ComponentProps<'input'> {
  label: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, type = 'text', ...props }, ref) => {
    return (
      <label className="space-y-1">
        <span className="font-semibold">
          {label} <FieldError name={props.name} />
        </span>
        <input
          className="w-full border-none outline-none bg-gray-100 text-black rounded-md font-bold placeholder-medium placeholder-gray-400 transition ease-in-out duration-200 focus:ring-2 focus:ring-black"
          type={type}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
export default Input;
