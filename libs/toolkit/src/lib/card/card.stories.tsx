import { Story, Meta } from '@storybook/react';
import { Card, CardProps } from './card';

export default {
  component: Card,
  title: 'Card',
} as Meta;

const Template: Story<CardProps> = (args) => (
  <Card {...args} className="shadow rounded-md p-4">
    <h1>This is a card</h1>
  </Card>
);

export const Primary = Template.bind({});
Primary.args = {};
