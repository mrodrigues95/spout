import { Story, Meta } from '@storybook/react';
import { Dropzone, DropzoneProps } from './dropzone';

export default {
  component: Dropzone,
  title: 'Dropzone',
} as Meta;

const Template: Story<DropzoneProps> = (args) => <Dropzone {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
