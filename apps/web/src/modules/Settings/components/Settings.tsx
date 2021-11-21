import { ReactElement, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Tabs } from '@spout/toolkit';
import { IdentificationIcon, SettingsIcon } from '@spout/assets/icons/solid';
import { Layout, Container, Card } from '../../../shared/components';
import { UserInfoFragment } from '../../Classrooms/Discussion/utils/fragments';
import { MeQuery } from './__generated__/Profile.generated';
import SettingsHeader from './SettingsHeader';
import MyDetails from './MyDetails';

interface Tab {
  label: string;
  icon: ReactElement;
  component: ReactElement;
}

const Profile = () => {
  const { data, loading, error, refetch } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `
  );

  const [tabs] = useState<Tab[]>([
    {
      label: 'My Details',
      icon: <IdentificationIcon className="w-5 h-5 mr-2" />,
      component: <MyDetails />,
    },
    {
      label: 'App Settings',
      icon: <SettingsIcon className="w-5 h-5 mr-2" />,
      component: <span>app settings</span>,
    },
  ]);

  return (
    <Layout title="Settings">
      <Container title="Settings" isLoading={loading} isError={error} refetch={refetch}>
        {data && (
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
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
