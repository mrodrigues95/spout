import { Story, Meta } from '@storybook/react';
import { Fragment } from 'react';
import {
  HorizontalNavigation,
  HorizontalNavigationProps,
} from './horizontal-navigation';

export default {
  component: HorizontalNavigation,
  title: 'HorizontalNavigation',
} as Meta;

const Template: Story<HorizontalNavigationProps> = () => (
  <HorizontalNavigation>
    {Array(40)
      .fill(<HorizontalNavigation.Item>S</HorizontalNavigation.Item>)
      .map((item, idx) => (
        <Fragment key={idx}>{item}</Fragment>
      ))}
  </HorizontalNavigation>
);

export const Primary = Template.bind({});
Primary.args = {};
