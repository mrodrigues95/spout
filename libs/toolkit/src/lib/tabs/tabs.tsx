import { ReactNode } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';
import { TabList } from './tab-list';
import { TabPanels } from './tab-panels';
import { TabPanel } from './tab-panel';
import { Tab } from './tab';
import { TabProvider } from './tab-provider';

export const VARIANTS = {
  default: {
    tab: {
      base: 'relative inline-flex items-center justify-center px-3 py-2.5 text-sm font-semibold focus:outline-none',
      active:
        'text-blue-700 border-b-2 border-current focus-visible:bg-blue-50 hover:text-blue-900',
      inactive:
        'text-gray-900 border-transparent focus-visible:bg-gray-100 hover:bg-gray-100',
    },
    tabList: 'flex space-x-10 border-b border-gray-200',
  },
  primary: {
    tab: {
      base: 'relative flex w-full items-center justify-center px-8 py-2',
      active: 'bg-white rounded-lg shadow-md text-gray-900 font-semibold',
      inactive: 'bg-transparent text-gray-400',
    },
    tabList: 'flex p-1 space-x-6 bg-gray-100 rounded-lg',
  },
};

export interface TabsProps {
  children: ReactNode;
  manual?: boolean;
  selectedIndex?: number;
  onChange?: (index: number) => void;
  defaultIndex?: number;
  variant?: keyof typeof VARIANTS;
  className?: string;
}

export const Tabs = ({
  children,
  className,
  variant = 'default',
  ...props
}: TabsProps) => {
  return (
    <TabProvider variant={variant}>
      <HeadlessTab.Group {...props}>
        <div className={clsx('flex flex-1 flex-col', className)}>
          {children}
        </div>
      </HeadlessTab.Group>
    </TabProvider>
  );
};

Tabs.List = TabList;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
Tabs.Tab = Tab;
