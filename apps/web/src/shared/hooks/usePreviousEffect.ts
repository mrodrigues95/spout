import { useEffect, useRef } from 'react';

export const usePreviousEffect = <TDeps extends readonly unknown[]>(
  effect: (deps: TDeps) => ReturnType<typeof useEffect>,
  deps: TDeps,
) => {
  const previousDepsRef = useRef<TDeps>(deps);

  useEffect(() => {
    effect(previousDepsRef.current);
    previousDepsRef.current = deps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
