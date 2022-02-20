import { forwardRef } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import clsx from 'clsx';
import { FieldError } from '../form';

export interface FormTextAreaProps extends TextareaAutosizeProps {
  label: string;
  isHiddenLabel?: boolean;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, className, isHiddenLabel = false, ...props }, ref) => {
    return (
      <label className="flex flex-col items-start justify-center space-y-1">
        <span className={clsx('font-semibold', isHiddenLabel && 'sr-only')}>
          {label} <FieldError name={props.name} />
        </span>
        <TextareaAutosize
          className={clsx(
            'outline-none w-full rounded-md border-none bg-gray-100 font-medium text-black transition duration-200 ease-in-out placeholder-shown:font-normal focus:ring-2 focus:ring-black',
            className,
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
