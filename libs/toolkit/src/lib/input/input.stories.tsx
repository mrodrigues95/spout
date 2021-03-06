import { Story, Meta } from '@storybook/react';
import { Input, InputProps } from './input';

export default {
  component: Input,
  title: 'Input',
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} ref={null} />;

export const Primary = Template.bind({});
Primary.args = {};
