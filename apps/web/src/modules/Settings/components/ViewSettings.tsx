import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard, faCog } from '@fortawesome/free-solid-svg-icons';
import { Tabs, Title } from '@spout/toolkit';
import { Header, Main } from '../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../shared/hooks';
import { Profile } from './Profile';
import { Account } from './Account';

const ViewSettings = () => {
  const isTablet = useMediaQuery(MEDIA_QUERIES.LARGE);

  const tabs = useMemo(
    () => [
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
    ],
    [],
  );

  return (
    <>
      <Header>
        <Title as="h1" variant={isTablet ? 'h1' : 'h3'}>
          Settings
        </Title>
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
