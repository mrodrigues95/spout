import { Story, Meta } from '@storybook/react';
import { Button } from './button';
import { ButtonOrLinkProps } from './buttonOrLink';

export default {
  component: Button,
  title: 'Button',
} as Meta;

const Template: Story<ButtonOrLinkProps> = (args) => (
  <Button size="md" scheme="gray" {...args}>
    Click me!
  </Button>
);

export const Solid = Template.bind({});
Solid.args = {
  variant: 'solid',
};

export const Light = Template.bind({});
Light.args = {
  variant: 'light',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variant: 'ghost',
};

export const Outline = Template.bind({});
Outline.args = {
  variant: 'outline',
};

export const Link = Template.bind({});
Link.args = {
  variant: 'link',
};
