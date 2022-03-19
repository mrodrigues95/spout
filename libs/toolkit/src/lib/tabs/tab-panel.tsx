import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabPanelProps = ComponentProps<'div'>;

export const TabPanel = ({ className, children, ...props }: TabPanelProps) => {
  return (
    <Tab.Panel
      className={clsx(
        'mt-3 w-full rounded-xl bg-white outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </Tab.Panel>
  );
};
