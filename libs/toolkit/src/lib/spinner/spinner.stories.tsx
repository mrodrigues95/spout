import { Story, Meta } from '@storybook/react';
import { Spinner, SpinnerProps } from './spinner';

export default {
  argTypes: {
    srLabel: { control: false },
    className: { control: false },
  },
  component: Spinner,
  title: 'Spinner',
} as Meta;

const Template: Story<SpinnerProps> = (args) => <Spinner {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 'md',
  scheme: 'black',
  variant: 'bricks',
};
