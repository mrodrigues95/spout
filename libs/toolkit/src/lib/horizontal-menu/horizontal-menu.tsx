import {
  Children,
  cloneElement,
  ContextType,
  MouseEvent,
  WheelEvent,
} from 'react';
import {
  ScrollMenu,
  VisibilityContext,
  Props as ScrollingMenuProps,
} from 'react-horizontal-scrolling-menu';
import { useDrag } from '@spout/utils';
import clsx from 'clsx';
import { LeftArrow, RightArrow } from './horizontal-menu-arrow';

type visibilityType = ContextType<typeof VisibilityContext>;

const onWheel = (api: visibilityType, ev: WheelEvent) => {
  const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isTouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    api.scrollNext();
  } else if (ev.deltaY > 0) {
    api.scrollPrev();
  }
};

export interface HorizontalMenuProps extends ScrollingMenuProps {
  hideScroll?: boolean;
}

export const HorizontalMenu = ({
  hideScroll = true,
  scrollContainerClassName,
  children,
  ...props
}: HorizontalMenuProps) => {
  const { dragStart, dragStop, dragMove } = useDrag();

  const handleDrag = ({ scrollContainer }: visibilityType) => (
    ev: MouseEvent
  ) => {
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });
  };

  // `itemId` is required in order to properly track items.
  const childrenWithItemId = Children.map(children, (child) => {
    return cloneElement(child, { itemId: child.key as string });
  });

  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        scrollContainerClassName={clsx(
          hideScroll && 'overflow-hidden',
          scrollContainerClassName
        )}
        {...props}
      >
        {childrenWithItemId}
      </ScrollMenu>
    </div>
  );
};

HorizontalMenu.LeftArrow = LeftArrow;
HorizontalMenu.RightArrow = RightArrow;
