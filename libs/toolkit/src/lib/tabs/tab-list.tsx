import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabListProps = ComponentProps<'div'>;

export const TabList = ({ className, children, ...props }: TabListProps) => {
  return (
    <Tab.List
      className={clsx('flex space-x-10 border-b border-gray-200', className)}
      {...props}
    >
      {children}
    </Tab.List>
  );
};
