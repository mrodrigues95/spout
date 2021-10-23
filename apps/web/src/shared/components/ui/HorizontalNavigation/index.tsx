import {
  HorizontalMenu as SHorizontalMenu,
  HorizontalMenuProps as SHorizontalMenuProps,
} from '@spout/toolkit';
import { ChevronIcon } from '@spout/assets/icons/outline';

interface Props extends SHorizontalMenuProps {
  arrows?: boolean;
}

const HorizontalNavigation = ({ arrows = true, children, ...props }: Props) => {
  const LeftArrow = (
    <SHorizontalMenu.LeftArrow
      aria-label="Next"
      aria-hidden="true"
      tabIndex={-1}
    >
      <ChevronIcon className="w-4 h-4 text-black" />
    </SHorizontalMenu.LeftArrow>
  );

  const RightArrow = (
    <SHorizontalMenu.RightArrow
      aria-label="Previous"
      aria-hidden="true"
      tabIndex={-1}
    >
      <ChevronIcon className="w-4 h-4 text-black transform rotate-180" />
    </SHorizontalMenu.RightArrow>
  );

  return (
    <SHorizontalMenu
      LeftArrow={arrows && LeftArrow}
      RightArrow={arrows && RightArrow}
      scrollContainerClassName="space-x-2 py-2"
      separatorClassName="ml-2 -mr-2 border border-gray-300"
      {...props}
    >
      {children}
    </SHorizontalMenu>
  );
};

export default HorizontalNavigation;
