import { useCallback, useEffect, useRef, useState } from 'react';

export const useThrottle = <T extends any[]>(
  fn: (...args: T) => void,
  interval = 300
): [(...args: T) => void, boolean] => {
  const [ready, setReady] = useState(true);
  const timerRef = useRef<number | undefined>(undefined);

  const throttledFn = useCallback(
    (...args: T) => {
      if (!ready) return;

      setReady(false);
      fn(...args);
    },
    [ready, fn]
  );

  useEffect(() => {
    if (!ready) {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setReady(true);
      }, interval);
    }

    return () => clearTimeout(timerRef.current);
  }, [ready, interval]);

  return [throttledFn, ready];
};
