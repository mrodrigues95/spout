import { Story, Meta } from '@storybook/react';
import { Skeleton, SkeletonProps } from './skeleton';

export default {
  component: Skeleton,
  title: 'Skeleton',
} as Meta;

export const Single: Story<SkeletonProps> = (args) => <Skeleton {...args} />;

export const Stack: Story<SkeletonProps> = (args) => {
  return (
    <Skeleton.Stack>
      <Skeleton {...args} className="w-1/2" />
      <Skeleton {...args} className="w-2/3" />
      <Skeleton {...args} className="w-5/6" />
    </Skeleton.Stack>
  );
};
