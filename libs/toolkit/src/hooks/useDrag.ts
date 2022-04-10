import { useCallback, useRef, useState, MouseEvent } from 'react';

export const useDrag = () => {
  const [clicked, setClicked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const position = useRef(0);

  const dragStart = useCallback(<T = HTMLDivElement>(ev: MouseEvent<T>) => {
    position.current = ev.clientX;
    setClicked(true);
  }, []);

  const dragStop = useCallback(
    () =>
      window.requestAnimationFrame(() => {
        setDragging(false);
        setClicked(false);
      }),
    [],
  );

  const dragMove = useCallback(
    <T = HTMLDivElement>(ev: MouseEvent<T>, cb: (posDif: number) => void) => {
      const newDiff = position.current - ev.clientX;
      const movedEnough = Math.abs(newDiff) > 5;

      if (clicked && movedEnough) setDragging(true);

      if (dragging && movedEnough) {
        position.current = ev.clientX;
        cb(newDiff);
      }
    },
    [clicked, dragging],
  );

  return {
    dragStart,
    dragStop,
    dragMove,
    dragging,
    position,
    setDragging,
  };
};
