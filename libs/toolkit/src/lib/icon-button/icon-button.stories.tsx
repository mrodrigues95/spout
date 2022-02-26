import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Story, Meta } from '@storybook/react';
import { IconButton, IconButtonProps } from './icon-button';

export default {
  component: IconButton,
  title: 'IconButton',
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <FontAwesomeIcon icon={faCheck} />,
};
