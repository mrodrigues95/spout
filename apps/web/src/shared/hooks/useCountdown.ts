import { useCallback, useEffect, useState } from 'react';
import { useInterval } from './useInterval';

interface TUseCountdown {
  initialCount: number;
  interval: number;
  onCountdownComplete?(): void;
  stopAtZero?: boolean;
  resetAtZero?: boolean;
}

export const useCountdown = ({
  initialCount,
  interval,
  onCountdownComplete,
  stopAtZero = false,
  resetAtZero = false,
}: TUseCountdown) => {
  const [counter, setCounter] = useState(initialCount);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const { interval: triggerInterval, stopInterval } = useInterval();

  const stop = useCallback(() => {
    stopInterval();
    setIsCountingDown(false);
  }, [stopInterval]);

  const reset = useCallback(() => {
    stop();
    setCounter(initialCount);
  }, [initialCount, stop]);

  const start = useCallback(() => {
    reset();
    triggerInterval(() => setCounter((prev) => --prev), interval);
    setIsCountingDown(true);
  }, [interval, reset, triggerInterval]);

  useEffect(() => {
    if (stopAtZero && counter === 0) {
      stop();
      if (onCountdownComplete) onCountdownComplete();
    } else if (resetAtZero && counter === 0) {
      reset();
      if (onCountdownComplete) onCountdownComplete();
    }
  }, [
    counter,
    initialCount,
    stop,
    reset,
    stopAtZero,
    resetAtZero,
    onCountdownComplete,
  ]);

  return [counter, { start, stop, reset, isCountingDown }] as const;
};
