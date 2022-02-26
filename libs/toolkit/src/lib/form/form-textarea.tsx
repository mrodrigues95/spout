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
            'outline-none w-full rounded-md border-2 border-transparent bg-gray-100 font-medium text-black transition duration-200 ease-in-out',
            'ring-offset-4 placeholder-shown:font-normal focus:border-blue-700 focus:ring-2 focus:ring-blue-200',
            className,
          )}
          ref={ref}
          {...props}
        />
      </label>
    );
  },
);
