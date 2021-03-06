import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface MenuGroupProps extends ComponentProps<'div'> {}

export const MenuGroup = ({
  className,
  children,
  ...props
}: MenuGroupProps) => {
  return (
    <div className={twMerge(clsx('w-full p-1', className))} {...props}>
      {children}
    </div>
  );
};
