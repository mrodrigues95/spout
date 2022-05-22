import { RefCallback, useRef, useCallback, useMemo } from 'react';
import { createPopper, Modifier, Options } from '@popperjs/core';

export const customPopperModifiers: Record<
  'sameWidth',
  Modifier<string, Record<string, unknown>>
> = {
  sameWidth: {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn({ state }) {
      state.styles.popper.minWidth = `${state.rects.reference.width}px`;
    },
    effect({ state }) {
      const reference = state.elements.reference as HTMLElement;
      state.elements.popper.style.minWidth = `${reference.offsetWidth}px`;
    },
  },
};

export const defaultPopperOptions: Options = {
  placement: 'bottom-end',
  strategy: 'fixed',
  modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
};

export const usePopper = (
  options: Partial<Options> = defaultPopperOptions,
): [RefCallback<Element | null>, RefCallback<HTMLElement | null>] => {
  const reference = useRef<Element | null>(null);
  const popper = useRef<HTMLElement | null>(null);

  const cleanupCallback = useRef<() => void>();

  const instantiatePopper = useCallback(() => {
    if (!reference.current || !popper.current) return;

    if (cleanupCallback.current) cleanupCallback.current();

    cleanupCallback.current = createPopper(reference.current, popper.current, {
      ...defaultPopperOptions,
      ...options,
    }).destroy;
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
