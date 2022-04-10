import { Story, Meta } from '@storybook/react';
import { Divider, DividerProps } from './divider';

export default {
  component: Divider,
  title: 'Divider',
} as Meta;

const Template: Story<DividerProps> = () => <Divider />;

export const Primary = Template.bind({});
Primary.args = {};
