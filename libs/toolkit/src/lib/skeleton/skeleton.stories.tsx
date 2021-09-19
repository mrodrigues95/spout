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

export const Single: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Stack: Story<SkeletonProps> = (args) => {
  return (
    <Skeleton.Stack>
      <Skeleton {...args} w="w-1/2" />
      <Skeleton {...args} w="w-2/3" />
      <Skeleton {...args} w="w-5/6" />
    </Skeleton.Stack>
  );
};