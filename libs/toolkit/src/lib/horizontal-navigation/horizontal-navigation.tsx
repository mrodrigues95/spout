import {
  useCallback,
  useRef,
  MouseEvent,
  WheelEvent,
  ComponentProps,
  useState,
  useEffect,
} from 'react';
import { Tab } from '@headlessui/react';
import { usePreventScroll } from '@react-aria/overlays';
import { useResizeObserver } from '@react-aria/utils';
import {
  HorizontalNavigationItem,
  getHorizontalNavigationItemStyles,
} from './horizontal-navigation-item';
import { HorizontalNavigationDivider } from './horizontal-navigation-divider';
import { HorizontalNavigationArrow } from './horizontal-navigation-arrow';
import { useDrag } from '../../hooks';

const SCROLL_ARROW_AMOUNT = 200;

export interface HorizontalNavigationProps
  extends Omit<ComponentProps<'div'>, 'onChange'> {
  defaultIndex?: number;
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export const HorizontalNavigation = ({
  defaultIndex,
  selectedIndex,
  onChange,
  children,
  ...props
}: HorizontalNavigationProps) => {
  const { dragStart, dragStop, dragMove } = useDrag();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [arrows, setArrows] = useState({ showLeft: false, showRight: false });
  const [shouldLockBodyScroll, setShouldLockBodyScroll] = useState(false);

  usePreventScroll({ isDisabled: !shouldLockBodyScroll });

  const checkScrollPosition = useCallback(() => {
    if (scrollRef.current) {
      // TODO: Right navigation arrow shows sometimes when there is nothing to scroll (bad calculation).
      setArrows({
        showLeft: Math.abs(scrollRef.current.scrollLeft) !== 0,
        showRight:
          scrollRef.current.scrollLeft !==
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth,
      });
    }
  }, []);

  const onWheel = useCallback((ev: WheelEvent<HTMLDivElement>) => {
    const isTouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isTouchpad) {
      ev.stopPropagation();
      return;
    }

    if (!scrollRef.current) return;

    if (ev.deltaY < 0) {
      scrollRef.current.scrollLeft += 100;
    } else if (ev.deltaY > 0) {
      scrollRef.current.scrollLeft -= 100;
    }
  }, []);

  const handleDrag = useCallback(
    (ev: MouseEvent<HTMLDivElement>) => {
      dragMove(ev, (posDiff) => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += posDiff;
        }
      });
    },
    [dragMove],
  );

  const scrollTo = useCallback((shift: number) => {
    scrollRef.current?.scrollTo({
      top: 0,
      left: scrollRef.current.scrollLeft + shift,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    checkScrollPosition();
  }, [checkScrollPosition]);

  useResizeObserver({ ref: scrollRef, onResize: checkScrollPosition });

  return (
    <Tab.Group
      defaultIndex={defaultIndex}
      selectedIndex={selectedIndex}
      onChange={onChange}
      manual
    >
      <Tab.List className="relative flex w-full overflow-hidden">
        {arrows.showLeft && (
          <HorizontalNavigationArrow
            onClick={() => scrollTo(-SCROLL_ARROW_AMOUNT)}
            isLeftArrow
          />
        )}
        <div
          onWheel={onWheel}
          onMouseMove={handleDrag}
          onMouseDown={dragStart}
          onMouseUp={dragStop}
          onMouseLeave={dragStop}
          onScroll={checkScrollPosition}
          onMouseOver={() => {
            // Only lock when the content is overflowed.
            if (
              scrollRef.current &&
              scrollRef.current.scrollWidth > scrollRef.current.clientWidth
            ) {
              setShouldLockBodyScroll(true);
            }
          }}
          onMouseOut={() => setShouldLockBodyScroll(false)}
          ref={scrollRef}
          className="relative flex flex-1 space-x-2 overflow-hidden py-2.5 px-1.5"
          {...props}
        >
          {children}
        </div>
        {arrows.showRight && (
          <HorizontalNavigationArrow
            onClick={() => scrollTo(SCROLL_ARROW_AMOUNT)}
          />
        )}
      </Tab.List>
    </Tab.Group>
  );
};

export { getHorizontalNavigationItemStyles };

HorizontalNavigation.Divider = HorizontalNavigationDivider;
HorizontalNavigation.Item = HorizontalNavigationItem;
