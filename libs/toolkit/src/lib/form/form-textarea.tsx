import { forwardRef } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import clsx from 'clsx';
import { FieldError } from '../form';

export interface FormTextAreaProps extends TextareaAutosizeProps {
  label: string;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className="flex flex-col justify-center items-start space-y-1">
        <span className="font-semibold">
          {label} <FieldError name={props.name} />
        </span>
        <TextareaAutosize
          className={clsx(
            'w-full border-none outline-none bg-gray-100 text-black rounded-md placeholder-shown:font-normal font-medium transition ease-in-out duration-200 focus:ring-2 focus:ring-black',
            className
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  }
);
