import { forwardRef, useLayoutEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FormLabel, FormLabelProps } from './form-label';
import { FormHelperText, FormHelperTextProps } from './form-helper-text';

export interface FormTextAreaProps
  extends TextareaAutosizeProps,
    Pick<FormLabelProps, 'name' | 'label'>,
    Pick<FormHelperTextProps, 'helperText'> {
  helperTextProps?: FormHelperTextProps;
  labelProps?: Omit<FormLabelProps, 'name' | 'label'>;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      className,
      label,
      name,
      helperText,
      helperTextProps = {},
      labelProps = {},
      ...props
    },
    ref,
  ) => {
    const [isRerendered, setIsRerendered] = useState(false);
    const {
      formState: { errors },
    } = useFormContext();
    const error = errors[name!];

    // Temp fix for https://github.com/Andarist/react-textarea-autosize/issues/337#issuecomment-1037061958
    useLayoutEffect(() => setIsRerendered(true), []);

    if (!isRerendered) return null;

    return (
      <>
        <FormLabel name={name} label={label} {...labelProps}>
          <TextareaAutosize
            className={twMerge(
              clsx(
                'w-full rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none ring-offset-4 transition duration-150 ease-in-out',
                'placeholder-shown:font-normal disabled:opacity-60',
                error
                  ? 'focus:border-red-700 focus:ring-4 focus:ring-red-200'
                  : 'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
                className,
              ),
            )}
            aria-invalid={!!error}
            ref={ref}
            name={name}
            {...props}
          />
        </FormLabel>
        <FormHelperText helperText={helperText} {...helperTextProps} />
      </>
    );
  },
);
