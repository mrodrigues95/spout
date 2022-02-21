import { RefCallback, useRef, useCallback, useMemo } from 'react';
import { createPopper, Options } from '@popperjs/core';

export const usePopper = (
  options?: Partial<Options>,
): [RefCallback<Element | null>, RefCallback<HTMLElement | null>] => {
  const reference = useRef<Element | null>(null);
  const popper = useRef<HTMLElement | null>(null);

  const cleanupCallback = useRef<() => void>();

  const instantiatePopper = useCallback(() => {
    if (!reference.current || !popper.current) return;

    if (cleanupCallback.current) cleanupCallback.current();

    cleanupCallback.current = createPopper(
      reference.current,
      popper.current,
      options,
    ).destroy;
  }, [reference, popper, cleanupCallback, options]);

  return useMemo(
    () => [
      (referenceDomNode) => {
        reference.current = referenceDomNode;
        instantiatePopper();
      },
      (popperDomNode) => {
        popper.current = popperDomNode;
        instantiatePopper();
      },
    ],
    [reference, popper, instantiatePopper],
  );
};
