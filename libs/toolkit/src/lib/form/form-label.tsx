import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FieldError } from './form';
import { useFormError } from './hooks';

export interface FormLabelProps extends ComponentProps<'label'> {
  label: string;
  name?: string;
  errorTextPlacement?: 'top' | 'bottom';
  labelTextProps?: ComponentProps<'span'>;
}

export const FormLabel = ({
  className,
  children,
  name,
  label,
  errorTextPlacement = 'top',
  labelTextProps: _labelTextProps = {},
  ...props
}: FormLabelProps) => {
  const { hasError, error } = useFormError(name);
  const { className: labelTextClassName, ...labelTextProps } = _labelTextProps;

  return (
    <label
      className={twMerge(
        clsx(
          'flex flex-col items-start justify-center space-y-2',
          hasError ? 'text-red-600' : 'text-gray-900',
          className,
        ),
      )}
      {...props}
    >
      <div>
        <span
          className={clsx('font-medium', labelTextClassName)}
          {...labelTextProps}
        >
          {label}{' '}
        </span>
        {errorTextPlacement === 'top' && <FieldError error={error} />}
      </div>
      {children}
      {errorTextPlacement === 'bottom' && <FieldError error={error} />}
    </label>
  );
};
