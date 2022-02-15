import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import clsx from 'clsx';
import {
  HorizontalNavigation,
  HorizontalNavigationProps,
} from './horizontal-navigation';

export default {
  component: HorizontalNavigation,
  title: 'HorizontalNavigation',
} as Meta;

const prefix = 'test';
const getId = (index: number) => `${prefix}${index}`;

const getItems = () =>
  Array(40)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const Template: Story<HorizontalNavigationProps> = ({ ...args }) => {
  const [items] = useState(getItems);

  return (
    <HorizontalNavigation {...args}>
      {items.map(({ id }) => (
        <button
          key={id}
          type="button"
          className={clsx('relative rounded bg-indigo-400 p-4 text-white')}
          onClick={() => console.log(id)}
        >
          {id}
        </button>
      ))}
    </HorizontalNavigation>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  hideScroll: true,
};
