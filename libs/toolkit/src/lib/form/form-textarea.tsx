import { forwardRef } from 'react';
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FormLabel, FormLabelProps } from './form-label';
import { useFormError } from './hooks';
import { getBaseInputStyles } from './utils';
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
    const { hasError } = useFormError(name);

    return (
      <>
        <FormLabel name={name} label={label} {...labelProps}>
          <TextareaAutosize
            className={twMerge(clsx(getBaseInputStyles(hasError), className))}
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
