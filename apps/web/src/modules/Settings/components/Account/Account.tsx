import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { Spinner } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import ChangePassword from './ChangePassword';
import ChangeEmail from './ChangeEmail';
import TwoFactorAuth from './TwoFactorAuth';
import ChangePhoneNumber from './ChangePhoneNumber';
import DeleteAccount from './DeleteAccount';
import { AccountQuery } from './__generated__/AccountQuery.graphql';

const query = graphql`
  query AccountQuery {
    me {
      ...ChangeEmail_user
      ...TwoFactorAuth_user
      ...ChangePhoneNumber_user
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Account = ({ fetchKey }: Props) => {
  const data = useLazyLoadQuery<AccountQuery>(query, {}, { fetchKey });

  return (
    <div className="flex flex-col space-y-5 divide-y divide-gray-200">
      <div className="space-y-6">
        <ChangeEmail me={data.me!} />
        <ChangePassword />
        <ChangePhoneNumber me={data.me!} />
      </div>
      <TwoFactorAuth me={data.me!} />
      <DeleteAccount />
    </div>
  );
};

const AccountWithSuspense = () => {
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
          <Account fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default AccountWithSuspense;
