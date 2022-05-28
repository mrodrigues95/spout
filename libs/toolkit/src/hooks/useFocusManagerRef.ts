import { useImperativeHandle, useRef } from 'react';
import { createFocusManager } from '@react-aria/focus';
import { FocusableRef } from '@react-types/shared';
import { createDOMRef } from '@react-spectrum/utils';

export const useFocusManagerRef = (ref: FocusableRef<HTMLElement>) => {
  const domRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => ({
    ...createDOMRef(domRef),
    focus() {
      createFocusManager(domRef).focusFirst({ tabbable: true });
    },
  }));
  return domRef;
};
