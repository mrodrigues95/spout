import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  RefObject,
  useCallback,
} from 'react';
import { useObserver } from '../../../hooks/useObserver';

export interface Props {
  children: ReactNode;
  length: number;
  amount?: number;
  next(amount?: number): void;
  hasNext: boolean;
  loader: ReactNode;
  container: RefObject<Element>;
  isReverse?: boolean;
}

// TODO: Fix an issue that occurs when you manually hold the scrollbar to the top of the container
// it will infinitely fetch.
// We should detect if the scrollbar is being held and if so, don't trigger `next()` until it has
// been released.
const InfiniteList = ({
  children,
  hasNext,
  next,
  amount,
  length,
  loader,
  container,
  isReverse = false,
}: Props) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scrollParentHeight, setScrollParentHeight] = useState(0);
  const entry = useObserver(loaderRef, { threshold: 0.5 });

  const goToPrevScroll = useCallback(
    (oldHeight: number) => {
      if (!container.current) return;
      console.log('GOING TO PREV SCROLL');
      container.current.scrollTop =
        container.current.scrollHeight -
        oldHeight +
        container.current.scrollTop;
    },
    [container]
  );

  useEffect(() => {
    // Avoid immediately fetching on render for reversed lists.
    if (container.current) {
      console.log('SETTING SCROLLTOP');
      container.current.scrollTop = container.current.scrollHeight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReverse]);

  useEffect(() => {
    if (!loading) return;

    // Reposition the scroll bar after fetching more data.
    const timeout = setTimeout(() => {
      goToPrevScroll(scrollParentHeight);
      setLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length]);

  useEffect(() => {
    if (loading || !entry?.isIntersecting || !hasNext) return;
    console.log('FETCHING NEXT PAGE');
    // setLoading(true);
    // setScrollParentHeight(container.current?.scrollHeight ?? 0);
    // next(amount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting, loading, hasNext]);

  const load = (
    <>
      {loading && loader}
      {<div ref={loaderRef} />}
    </>
  );

  return (
    <>
      {isReverse && load}
      {children}
      {!isReverse && load}
    </>
  );
};

export default InfiniteList;
