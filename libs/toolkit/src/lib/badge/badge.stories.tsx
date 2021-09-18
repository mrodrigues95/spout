import { Story, Meta } from '@storybook/react';
import { Badge, BadgeProps } from './badge';

export default {
  component: Badge,
  title: 'Badge',
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args}>New</Badge>;

export const Primary = Template.bind({});
Primary.args = {
  scheme: 'pink',
};
