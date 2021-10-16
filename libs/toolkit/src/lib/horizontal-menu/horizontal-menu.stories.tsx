import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { HorizontalMenu, HorizontalMenuProps } from './horizontal-menu';
import { ChevronIcon } from '@spout/assets/icons/outline';

export default {
  component: HorizontalMenu,
  title: 'HorizontalMenu',
} as Meta;

const prefix = 'test';
const getId = (index: number) => `${prefix}${index}`;

const getItems = () =>
  Array(40)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const Template: Story<HorizontalMenuProps & { arrows: boolean }> = ({
  arrows,
  ...args
}) => {
  const [items] = useState(getItems);

  const LeftArrow = (
    <HorizontalMenu.LeftArrow>
      <ChevronIcon className="w-4 h-4 text-black" />
    </HorizontalMenu.LeftArrow>
  );

  const RightArrow = (
    <HorizontalMenu.RightArrow>
      <ChevronIcon className="w-4 h-4 text-black transform rotate-180" />
    </HorizontalMenu.RightArrow>
  );

  return (
    <HorizontalMenu
      LeftArrow={arrows && LeftArrow}
      RightArrow={arrows && RightArrow}
      scrollContainerClassName="space-x-2"
      {...args}
    >
      {items.map(({ id }) => (
        <button
          key={id}
          type="button"
          className="p-4 bg-indigo-400 text-white rounded"
        >
          {id}
        </button>
      ))}
    </HorizontalMenu>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  arrows: true,
  hideScroll: true,
};
