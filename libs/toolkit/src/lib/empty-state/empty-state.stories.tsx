import { Story, Meta } from '@storybook/react';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { EmptyState, EmptyStateProps } from './empty-state';
import { Button } from '../button';

export default {
  component: EmptyState,
  title: 'EmptyState',
  argTypes: {
    icon: { control: false },
  },
} as Meta;

export const Primary: Story<EmptyStateProps> = (args) => (
  <EmptyState {...args} />
);
Primary.args = {
  heading: 'No classrooms',
  icon: <FeelingBlueIllustration className="h-72 w-72" />,
};

export const Actions: Story<EmptyStateProps> = (args) => {
  return (
    <EmptyState {...args}>
      <Button>Try Again</Button>
    </EmptyState>
  );
};
Actions.args = {
  heading: 'No classrooms',
  body: "There doesn't appear to be any classrooms here...",
  icon: <FeelingBlueIllustration className="h-72 w-72" />,
};
