import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  RefObject,
  useCallback,
} from 'react';
import { useObserver } from '~/shared/hooks/useObserver';

export interface Props {
  children: ReactNode;
  length: number;
  amount?: number;
  next(amount?: number): void;
  hasNext: boolean;
  loader: ReactNode;
  scrollParent: RefObject<Element>;
  isReverse?: boolean;
}

const InfiniteList = ({
  children,
  hasNext,
  next,
  amount,
  length,
  loader,
  scrollParent,
  isReverse = false,
}: Props) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scrollParentHeight, setScrollParentHeight] = useState(0);
  const entry = useObserver(loaderRef, { threshold: 1 });

  const goToPrevScroll = useCallback(
    (oldHeight: number) => {
      if (!scrollParent.current) return;

      scrollParent.current.scrollTop =
        scrollParent.current.scrollHeight -
        oldHeight +
        scrollParent.current.scrollTop;
    },
    [scrollParent]
  );

  useEffect(() => {
    // Avoid immediately fetching on render for reversed lists.
    if (isReverse && scrollParent.current) {
      scrollParent.current.scrollTop = scrollParent.current.scrollHeight;
    }
  }, [isReverse, scrollParent]);

  useEffect(() => {
    // Reposition the scroll bar.
    const timeout = setTimeout(() => {
      setLoading(false);
      goToPrevScroll(scrollParentHeight);
    }, 100);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  useEffect(() => {
    if (loading || !entry?.isIntersecting || !hasNext) return;
    setLoading(true);
    setScrollParentHeight(scrollParent.current?.scrollHeight ?? 0);
    next(amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, loading, hasNext]);

  // If reversed, the intersection ref will be at the top and only intersect
  // when the viewport reaches the top as opposed to the bottom.
  const sortedElements = isReverse
    ? [hasNext && <div ref={loaderRef} />, loading && loader, children]
    : [children, loading && loader, hasNext && <div ref={loaderRef} />];

  return <>{sortedElements.map((element) => element)}</>;
};

export default InfiniteList;
