import { ComponentProps } from 'react';
import clsx from 'clsx';

export interface RadioGroupOptionsProps extends ComponentProps<'div'> {
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroupOptions = ({
  orientation = 'vertical',
  className,
  children,
  ...props
}: RadioGroupOptionsProps) => {
  return (
    <div
      className={clsx(
        'mt-1.5 flex',
        orientation === 'horizontal'
          ? 'flex-row space-x-2'
          : 'flex-col space-y-2',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
