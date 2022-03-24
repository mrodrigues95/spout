import { useCallback, useEffect, useRef } from 'react';

export const useInterval = () => {
  const intervalRef = useRef(0);

  const interval = useCallback((cb: () => void, delay: number) => {
    clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(cb, delay);
  }, []);

  const stopInterval = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return { interval, stopInterval };
};
