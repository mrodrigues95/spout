import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useFormError } from './hooks';
import { FormLabel, FormLabelProps } from './form-label';
import { getBaseInputStyles } from './utils';
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
            className={twMerge(clsx(getBaseInputStyles(hasError), className))}
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
