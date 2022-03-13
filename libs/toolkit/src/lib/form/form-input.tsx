import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FormLabel, FormLabelProps } from './form-label';
import { FormHelperText, FormHelperTextProps } from './form-helper-text';
import { useFormContext } from 'react-hook-form';
import { Input, InputProps } from '../input';

export interface FormInputProps
  extends InputProps,
    Pick<FormLabelProps, 'name' | 'label'>,
    Pick<FormHelperTextProps, 'helperText'> {
  helperTextProps?: FormHelperTextProps;
  labelProps?: Omit<FormLabelProps, 'name' | 'label'>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
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
    const {
      formState: { errors },
    } = useFormContext();
    const error = errors[name!];

    return (
      <>
        <FormLabel name={name} label={label} {...labelProps}>
          <Input
            {...props}
            className={twMerge(
              clsx(
                error
                  ? 'focus:border-red-700 focus:ring-4 focus:ring-red-200'
                  : 'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
                className,
              ),
            )}
            aria-invalid={!!error}
            name={name}
            ref={ref}
          />
        </FormLabel>
        <FormHelperText helperText={helperText} {...helperTextProps} />
      </>
    );
  },
);
