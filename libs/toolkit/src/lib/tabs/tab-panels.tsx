import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabPanelsProps = ComponentProps<'section'>;

export const TabPanels = ({
  className,
  children,
  ...props
}: TabPanelsProps) => {
  return (
    <Tab.Panels
      as="section"
      className={clsx('mt-2 flex', className)}
      {...props}
    >
      {children}
    </Tab.Panels>
  );
};
