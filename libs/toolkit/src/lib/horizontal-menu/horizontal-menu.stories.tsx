import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { ChevronIcon } from '@spout/assets/icons/outline';
import clsx from 'clsx';
import { HorizontalMenu, HorizontalMenuProps } from './horizontal-menu';

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
  showSeparatorsForIndexes = [],
  ...args
}) => {
  const [items] = useState(getItems);

  const LeftArrow = (
    <HorizontalMenu.LeftArrow aria-label="Next">
      <ChevronIcon className="w-4 h-4 text-black" />
    </HorizontalMenu.LeftArrow>
  );

  const RightArrow = (
    <HorizontalMenu.RightArrow aria-label="Previous">
      <ChevronIcon className="w-4 h-4 text-black transform rotate-180" />
    </HorizontalMenu.RightArrow>
  );

  return (
    <HorizontalMenu
      LeftArrow={arrows && LeftArrow}
      RightArrow={arrows && RightArrow}
      itemClassName="flex"
      scrollContainerClassName="space-x-2"
      separatorClassName={clsx(
        showSeparatorsForIndexes.length && 'h-full ml-2 -mr-2 border border-black'
      )}
      showSeparatorsForIndexes={showSeparatorsForIndexes}
      {...args}
    >
      {items.map(({ id }) => (
        <button
          key={id}
          type="button"
          className={clsx('relative p-4 bg-indigo-400 text-white rounded')}
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

export const WithSeparators = Template.bind({});
WithSeparators.args = {
  arrows: true,
  hideScroll: true,
  showSeparatorsForIndexes: [0, 4],
};
