import { Story, Meta } from '@storybook/react';
import { Skeleton, SkeletonProps } from './skeleton';

export default {
  argTypes: {
    h: { control: false },
    w: { control: false },
  },
  component: Skeleton,
  title: 'Skeleton',
} as Meta;

const Template: Story<SkeletonProps> = (args) => {
  return (
    <Skeleton.Stack>
      <Skeleton {...args} />
      <Skeleton {...args} />
      <Skeleton {...args} />
    </Skeleton.Stack>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
