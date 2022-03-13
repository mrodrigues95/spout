import { Text, Title, Button } from '@spout/toolkit';

const SettingsDeleteAccount = () => {
  return (
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
  );
};

export default SettingsDeleteAccount;
