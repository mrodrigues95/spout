import { Story, Meta } from '@storybook/react';
import { Button } from './button';
import { ButtonOrLinkProps } from './buttonOrLink';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonOrLinkProps> = (args) => (
  <Button {...args}>Click me!</Button>
);

export const Solid = Template.bind({});
Solid.args = {
  size: 'md',
  variant: 'solid',
  scheme: 'dark',
  rounded: 'normal',
};

export const Ghost = Template.bind({});
Ghost.args = {
  size: 'md',
  variant: 'ghost',
  scheme: 'gray',
  rounded: 'normal',
};

export const Outline = Template.bind({});
Outline.args = {
  size: 'md',
  variant: 'outline',
  scheme: 'gray',
  rounded: 'normal',
};
