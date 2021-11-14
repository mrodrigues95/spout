import { ComponentProps } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

type TabProps = ComponentProps<'button'>;

export const Tab = ({ className, children, ...props }: TabProps) => {
  return (
    <HeadlessTab
      className={({ selected }) =>
        clsx(
          'relative inline-flex items-center justify-center px-3 py-2.5 text-sm font-semibold border-b-2 outline-none',
          'hover:text-orange-500 focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white',
          selected
            ? 'text-orange-500 border-current'
            : 'text-gray-900 border-transparent',
          className
        )
      }
      {...props}
    >
      {children}
    </HeadlessTab>
  );
};
