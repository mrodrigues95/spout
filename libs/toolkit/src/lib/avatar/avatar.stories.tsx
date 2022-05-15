import { Story, Meta } from '@storybook/react';
import { Avatar, AvatarProps } from './avatar';

export default {
  component: Avatar,
  title: 'Avatar',
} as Meta;

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  src: 'https://bit.ly/ryan-florence',
  name: 'Ryan Florence',
};

export const Initials = Template.bind({});
Initials.args = {
  name: 'John Doe',
};

export const Fallback = Template.bind({});
Fallback.args = {};
