import { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCog } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from '@spout/toolkit';
import { Layout, Card } from '../../../shared/components';
import SettingsHeader from './SettingsHeader';
import MyDetails from './MyDetails';

interface Tab {
  label: string;
  icon: ReactElement;
  component: ReactElement;
}

const Profile = () => {
  const [tabs] = useState<Tab[]>([
    {
      label: 'My Details',
      icon: <FontAwesomeIcon icon={faIdCard} className="mr-2" />,
      component: <MyDetails />,
    },
    {
      label: 'App Settings',
      icon: <FontAwesomeIcon icon={faCog} className="mr-2" />,
      component: <span>app settings</span>,
    },
  ]);

  return (
    <Layout title="Settings">
      <Card className="space-y-8">
        <SettingsHeader />
        <Tabs>
          <Tabs.List>
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.label}>
                {tab.icon}
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels>
            {tabs.map((tab) => (
              <Tabs.Panel key={tab.label}>{tab.component}</Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </Card>
    </Layout>
  );
};

export default Profile;
