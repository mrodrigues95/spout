import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { Spinner } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import SettingsChangePassword from './SettingsChangePassword';
import SettingsChangeEmail from './SettingsChangeEmail';
import SettingsTwoFactorAuth from './SettingsTwoFactorAuth';
import SettingsChangePhoneNumber from './SettingsChangePhoneNumber';
import SettingsDeleteAccount from './SettingsDeleteAccount';
import { SettingsAccountQuery } from '../../../../__generated__/SettingsAccountQuery.graphql';

const query = graphql`
  query SettingsAccountQuery {
    me {
      ...SettingsChangeEmail_user
      ...SettingsTwoFactorAuth_user
      ...SettingsChangePhoneNumber_user
    }
  }
`;

interface Props {
  fetchKey: number;
}

const SettingsAccount = ({ fetchKey }: Props) => {
  const data = useLazyLoadQuery<SettingsAccountQuery>(query, {}, { fetchKey });

  return (
    <div className="flex flex-col space-y-5 divide-y divide-gray-200">
      <div className="space-y-6">
        <SettingsChangeEmail me={data.me!} />
        <SettingsChangePassword />
        <SettingsChangePhoneNumber me={data.me!} />
      </div>
      <SettingsTwoFactorAuth me={data.me!} />
      <SettingsDeleteAccount />
    </div>
  );
};

const SettingsAccountWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="There was a problem loading your account details."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <SettingsAccount fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default SettingsAccountWithSuspense;
