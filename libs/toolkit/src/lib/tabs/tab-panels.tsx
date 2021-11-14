import { ComponentProps } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type TabPanelsProps = ComponentProps<'article'>;

export const TabPanels = ({
  className,
  children,
  ...props
}: TabPanelsProps) => {
  return (
    <Tab.Panels as="article" className={clsx('mt-2', className)} {...props}>
      {children}
    </Tab.Panels>
  );
};
