import { ReactNode } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import { TabList } from './tab-list';
import { TabPanels } from './tab-panels';
import { TabPanel } from './tab-panel';
import { Tab } from './tab';
import { TabProvider } from './tab-provider';

export const VARIANTS = {
  default: {
    tab: {
      base:
        'relative inline-flex items-center justify-center px-3 py-2.5 text-sm font-semibold border-b-2 outline-none',
      active:
        'text-orange-500 border-current hover:text-orange-500 focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white',
      inactive: 'text-gray-900 border-transparent',
    },
    tabList: 'flex space-x-10 border-b border-gray-200',
  },
  primary: {
    tab: {
      base: 'relative flex w-full items-center justify-center px-8 py-2',
      active: 'bg-white rounded-md shadow-md text-gray-900 font-semibold',
      inactive: 'bg-transparent text-gray-500',
    },
    tabList: 'flex p-1 space-x-6 bg-gray-100 rounded-md',
  },
};

export interface TabsProps {
  children: ReactNode;
  variant?: keyof typeof VARIANTS;
}

export const Tabs = ({ children, variant = 'default' }: TabsProps) => {
  return (
    <TabProvider variant={variant}>
      <HeadlessTab.Group as="div" className="flex flex-col flex-1">
        {children}
      </HeadlessTab.Group>
    </TabProvider>
  );
};

Tabs.List = TabList;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
Tabs.Tab = Tab;
