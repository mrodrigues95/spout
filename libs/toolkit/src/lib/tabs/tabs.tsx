import { ReactNode } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import { TabList } from './tab-list';
import { TabPanels } from './tab-panels';
import { TabPanel } from './tab-panel';
import { Tab } from './tab';

export interface TabsProps {
  children: ReactNode;
}

export const Tabs = ({ children }: TabsProps) => {
  return (
    <HeadlessTab.Group as="div" className="flex flex-col flex-1">
      {children}
    </HeadlessTab.Group>
  );
};

Tabs.List = TabList;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;
Tabs.Tab = Tab;
