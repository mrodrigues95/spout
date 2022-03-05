import { ReactElement, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCog } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Title } from '@spout/toolkit';
import { Header, Main } from '../../../shared/components';
import { Profile } from './Profile';
import { Account } from './Account';

interface Tab {
  label: string;
  icon: ReactElement;
  component: ReactElement;
}

const ViewSettings = () => {
  const [tabs] = useState<Tab[]>([
    {
      label: 'Profile',
      icon: <FontAwesomeIcon icon={faIdCard} className="mr-2" />,
      component: <Profile />,
    },
    {
      label: 'Account',
      icon: <FontAwesomeIcon icon={faCog} className="mr-2" />,
      component: <Account />,
    },
  ]);

  return (
    <>
      <Header>
        <Title as="h1">Settings</Title>
      </Header>
      <Main>
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
      </Main>
    </>
  );
};

export default ViewSettings;
