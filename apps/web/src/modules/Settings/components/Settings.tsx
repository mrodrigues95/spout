import { InferGetServerSidePropsType } from 'next';
import { getServerSideProps } from '../../../pages/settings';
import { Layout } from '../../../shared/components';
import { SettingsProvider } from './SettingsProvider';
import ViewSettings from './ViewSettings';

const Settings = ({
  sessionId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout title="Settings">
      <SettingsProvider sessionId={sessionId!}>
        <ViewSettings />
      </SettingsProvider>
    </Layout>
  );
};

export default Settings;
