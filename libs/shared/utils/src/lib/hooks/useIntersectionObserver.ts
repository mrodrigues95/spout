import { useState, useRef, useEffect, RefObject } from 'react';

export const useIntersectionObserver = (
  ref: RefObject<Element>,
  opts: IntersectionObserverInit
) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver>();

  if (!observerRef.current && typeof IntersectionObserver !== 'undefined') {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      { ...opts }
    );
  }

  useEffect(() => {
    const loaderEl = ref.current;
    const observer = observerRef.current;
    if (!loaderEl || !observer) return;

    observer.observe(loaderEl);
    return () => observer.unobserve(loaderEl);
  }, [ref]);

  return entry;
};
