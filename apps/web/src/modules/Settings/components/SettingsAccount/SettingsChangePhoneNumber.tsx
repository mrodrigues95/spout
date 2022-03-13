import { Title, Text, Button } from '@spout/toolkit';

const SettingsChangePhoneNumber = () => {
  return (
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
  );
};

export default SettingsChangePhoneNumber;
