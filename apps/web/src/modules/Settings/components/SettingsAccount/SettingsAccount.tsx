import { Button, Title, Text, Alert } from '@spout/toolkit';
import SettingsChangePassword from './SettingsChangePassword';

const SettingsAccount = () => {
  return (
    <div className="flex flex-col space-y-5 divide-y divide-gray-200">
      <div className="space-y-6">
        <div className="flex items-center">
          <Title as="h2" variant="h5" className="flex-1 font-medium">
            Email
          </Title>
          <Button>Change Email</Button>
        </div>
        <SettingsChangePassword />
        <div className="flex items-center">
          <div className="flex-1">
            <Title as="h2" variant="h5" className="font-medium">
              Phone Number
            </Title>
            <Text size="sm">
              There is currently no phone number associated with your account.
            </Text>
          </div>
          <Button>Change Phone Number</Button>
        </div>
      </div>
      <div>
        <div className="mt-5">
          <Alert
            severity="warning"
            title="Two-factor authentication is not yet enabled"
            description="Protect your account by adding an extra layer of security. Once
            configured, you'll need your password and a verification code to
            sign in."
          />
          <Button variant="primary" className="mt-6 ml-auto block">
            Enable Two-Factor Auth
          </Button>
        </div>
      </div>
      <div>
        <div className="mt-5">
          <Title as="h2" variant="h5" className="flex-1 font-medium">
            Delete Account
          </Title>
          <Text size="sm">
            When you delete your account, your profile, classrooms, discussions
            and any other related data will be permanently removed. This action
            cannot be undone.
          </Text>
          <Button className="mt-6 ml-auto block" variant="danger">
            Delete Your Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccount;
