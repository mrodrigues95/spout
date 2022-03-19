import { ComponentProps, forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface MenuItemsProps extends ComponentProps<'div'> {}

export const MenuItems = forwardRef<HTMLDivElement, MenuItemsProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <HeadlessMenu.Items
        className={twMerge(
          clsx(
            'mt-2 w-56 divide-y-2 divide-gray-100 rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            className,
          ),
        )}
        ref={ref}
        {...props}
      >
        {children}
      </HeadlessMenu.Items>
    );
  },
);
