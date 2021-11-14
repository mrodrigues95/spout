import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabPanelProps = ComponentProps<'div'>;

export const TabPanel = ({ className, children, ...props }: TabPanelProps) => {
  return (
    <Tab.Panel
      className={clsx('bg-white rounded-xl mt-3 outline-none', className)}
      {...props}
    >
      {children}
    </Tab.Panel>
  );
};
