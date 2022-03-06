import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useFormError } from './hooks';
import { FormLabel, FormLabelProps } from './form-label';
import { FormHelperText, FormHelperTextProps } from './form-helper-text';

export interface FormInputProps
  extends ComponentProps<'input'>,
    Pick<FormLabelProps, 'name' | 'label'>,
    Pick<FormHelperTextProps, 'helperText'> {
  helperTextProps?: FormHelperTextProps;
  labelProps?: Omit<FormLabelProps, 'name' | 'label'>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type = 'text',
      className,
      label,
      name,
      helperText,
      labelProps = {},
      helperTextProps = {},
      ...props
    },
    ref,
  ) => {
    const { hasError } = useFormError(name);

    return (
      <>
        <FormLabel name={name} label={label} {...labelProps}>
          <input
            className={twMerge(
              clsx(
                'outline-none w-full rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium ring-offset-4 transition duration-150 ease-in-out',
                'placeholder-shown:font-normal',
                hasError
                  ? 'focus:border-red-700 focus:ring-4 focus:ring-red-200'
                  : 'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
                className,
              ),
            )}
            type={type}
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
