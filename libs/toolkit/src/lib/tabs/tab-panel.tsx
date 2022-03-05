import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabPanelProps = ComponentProps<'div'>;

export const TabPanel = ({ className, children, ...props }: TabPanelProps) => {
  return (
    <Tab.Panel
      className={clsx(
        'outline-none mt-3 w-full rounded-xl bg-white',
        className,
      )}
      {...props}
    >
      {children}
    </Tab.Panel>
  );
};
