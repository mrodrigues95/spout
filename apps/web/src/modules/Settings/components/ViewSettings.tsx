import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCog } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Title } from '@spout/toolkit';
import { Header, Main } from '../../../shared/components';
import { SettingsProfile } from './SettingsProfile';
import { SettingsAccount } from './SettingsAccount';

const ViewSettings = () => {
  const tabs = useMemo(
    () => [
      {
        label: 'Profile',
        icon: <FontAwesomeIcon icon={faIdCard} className="mr-2" />,
        component: <SettingsProfile />,
      },
      {
        label: 'Account',
        icon: <FontAwesomeIcon icon={faCog} className="mr-2" />,
        component: <SettingsAccount />,
      },
    ],
    [],
  );

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
