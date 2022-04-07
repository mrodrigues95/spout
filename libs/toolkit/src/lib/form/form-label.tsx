import { useFormContext } from 'react-hook-form';
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FieldError } from './form';

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
  const {
    formState: { errors },
  } = useFormContext();
  const error = errors[name!];
  const { className: labelTextClassName, ...labelTextProps } = _labelTextProps;

  return (
    <label
      className={twMerge(
        clsx(
          'flex flex-col items-start justify-center space-y-1.5 text-sm',
          error ? 'text-red-600' : 'text-gray-900',
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
