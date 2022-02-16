import { useEffect } from 'react';

export const useKeyboardEvent = (key: string, cb: () => void) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === key) cb();
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [cb, key]);
};
