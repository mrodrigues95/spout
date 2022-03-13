import { Story, Meta } from '@storybook/react';
import { Alert, AlertProps } from './alert';

export default {
  component: Alert,
  title: 'Alert',
} as Meta;

const Template: Story<AlertProps & { showAction: boolean }> = ({
  showAction = false,
  ...args
}) => {
  if (showAction) {
    return (
      <Alert {...args}>
        <Alert.Action>Action</Alert.Action>
      </Alert>
    );
  }

  return <Alert {...args} />;
};

export const Info = Template.bind({});
Info.args = {
  severity: 'info',
  title: 'Info',
  description: 'This is an info alert',
  showAction: false,
};

export const Warning = Template.bind({});
Warning.args = {
  severity: 'warning',
  title: 'Warning',
  description: 'This is a warning alert',
  showAction: false,
};

export const Success = Template.bind({});
Success.args = {
  severity: 'success',
  title: 'Success',
  description: 'This is a success alert',
  showAction: false,
};

export const Error = Template.bind({});
Error.args = {
  severity: 'error',
  title: 'Error',
  description: 'This is a error alert',
  showAction: false,
};
