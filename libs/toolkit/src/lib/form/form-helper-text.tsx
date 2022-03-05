import { ComponentProps } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface FormHelperTextProps extends ComponentProps<'div'> {
  helperText?: string;
}

export const FormHelperText = ({
  helperText,
  className,
  ...props
}: FormHelperTextProps) => {
  if (!helperText) return null;

  return (
    <div
      className={twMerge(clsx('mt-1 text-sm text-gray-500', className))}
      {...props}
    >
      {helperText}
    </div>
  );
};
