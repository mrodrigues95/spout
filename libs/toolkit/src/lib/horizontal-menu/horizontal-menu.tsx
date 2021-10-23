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

export interface HorizontalMenuProps
  extends Omit<ScrollingMenuProps, 'separatorClassName'> {
  hideScroll?: boolean;
  separatorClassName?: string;
  showSeparatorsForIndexes?: number[];
}

export const HorizontalMenu = ({
  scrollContainerClassName,
  separatorClassName,
  hideScroll = true,
  showSeparatorsForIndexes = [],
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

  // This library doesn't support conditionally rendering certain separators
  // so we handle that ourselves with a bit of a hacky
  // solution using `showSeparatorsForIndexes`.
  const childrenWithItemId = Children.map(children, (child, idx) => {
    // `itemId` is required in order to properly track items.
    return cloneElement(
      <>
        {child}
        {showSeparatorsForIndexes.includes(idx) && (
          <span
            className={separatorClassName}
            aria-hidden="true"
          />
        )}
      </>,
      { itemId: child.key as string }
    );
  });

  return (
    <div onMouseLeave={dragStop}>
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        wrapperClassName="relative"
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
