import { useCallback, useEffect, useRef } from 'react';

export const useTimeout = () => {
  const timeoutRef = useRef(0);

  const timeout = useCallback((cb: () => void, delay: number) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(cb, delay);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return { timeout };
};
