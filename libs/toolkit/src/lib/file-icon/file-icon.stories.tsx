import { Story, Meta } from '@storybook/react';
import { FileIcon, FileIconProps } from './file-icon';

export default {
  component: FileIcon,
  title: 'FileIcon',
} as Meta;

const Template: Story<FileIconProps> = (args) => <FileIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: '3x'
};
Primary.parameters = {
  controls: { include: ['ext'] },
};
