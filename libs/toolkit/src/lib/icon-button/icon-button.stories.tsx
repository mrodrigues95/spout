import { Story, Meta } from '@storybook/react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, IconButtonProps } from './icon-button';

export default {
  component: IconButton,
  title: 'IconButton',
} as Meta;

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: <FontAwesomeIcon icon={faSearch} />,
  'aria-label': 'Search database',
};
Primary.parameters = {
  controls: { include: ['aria-label', 'size', 'variant', 'scheme'] },
};
