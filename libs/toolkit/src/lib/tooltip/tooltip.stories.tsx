import { Story, Meta } from '@storybook/react';
import { Tooltip, TooltipProps } from './tooltip';

export default {
  component: Tooltip,
  title: 'Tooltip',
} as Meta;

const Template: Story<TooltipProps> = (args) => {
  return (
    <div className="inline-block">
      <Tooltip {...args}>Hover me!</Tooltip>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  label: 'tooltip',
};
