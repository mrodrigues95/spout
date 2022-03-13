import { graphql, useFragment } from 'react-relay';
import { Alert, Button } from '@spout/toolkit';
import { SettingsTwoFactorAuth_user$key } from '../../../../__generated__/SettingsTwoFactorAuth_user.graphql';

const fragment = graphql`
  fragment SettingsTwoFactorAuth_user on User {
    emailConfirmed
  }
`;

interface Props {
  me: SettingsTwoFactorAuth_user$key;
}

const SettingsTwoFactorAuth = ({ ...props }: Props) => {
  const me = useFragment(fragment, props.me);

  const description = me.emailConfirmed
    ? "Protect your account by adding an extra layer of security. Once  configured, you'll need your password and a verification code to sign in."
    : 'You must verify your email before you can enable two-factor authentication.';

  return (
    <div>
      <div className="mt-5">
        <Alert
          severity={me.emailConfirmed ? 'warning' : 'info'}
          title="Two-factor authentication is not yet enabled"
          description={description}
        />
        {me.emailConfirmed && (
          <Button variant="primary" className="mt-6 ml-auto block">
            Enable Two-Factor Auth
          </Button>
        )}
      </div>
    </div>
  );
};

export default SettingsTwoFactorAuth;
