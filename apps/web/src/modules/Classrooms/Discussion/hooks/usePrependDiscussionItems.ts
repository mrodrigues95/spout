import { useMemo, useRef } from 'react';
import { Item } from '../utils/messages';

const PREPEND_OFFSET = 1000000;

export const usePrependDiscussionItems = (items: Item[]) => {
  const currentFirstItemId = items[0]?.id;
  const firstItemId = useRef(currentFirstItemId);
  const earliestItemId = useRef(currentFirstItemId);
  const previousNumItemsPrepended = useRef(0);

  const numItemsPrepended = useMemo(() => {
    if (!items.length) return 0;

    // If no new items were prepended, return early (same amount as before).
    if (currentFirstItemId === earliestItemId.current) {
      return previousNumItemsPrepended.current;
    }

    if (!firstItemId.current) {
      firstItemId.current = currentFirstItemId;
    }

    earliestItemId.current = currentFirstItemId;

    // If new items were prepended, find out how many
    // start with this number because there cannot be fewer prepended items than before.
    for (let i = previousNumItemsPrepended.current; i < items.length; i += 1) {
      if (items[i].id === firstItemId.current) {
        previousNumItemsPrepended.current = i;
        return i;
      }
    }

    return 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, items.length]);

  return PREPEND_OFFSET - numItemsPrepended;
};
