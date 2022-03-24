import { useLayoutEffect, useRef } from 'react';

export const usePreviousLayoutEffect = <TDeps extends readonly unknown[]>(
  effect: (deps: TDeps) => ReturnType<typeof useLayoutEffect>,
  deps: TDeps,
) => {
  const previousDepsRef = useRef<TDeps>(deps);

  useLayoutEffect(() => {
    effect(previousDepsRef.current);
    previousDepsRef.current = deps;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
