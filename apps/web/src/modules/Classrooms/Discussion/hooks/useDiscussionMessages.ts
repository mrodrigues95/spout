import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DiscussionMessage,
  generateItems,
  getRecentMessages,
  Item,
} from '../utils/messages';
import { useStore } from '../utils/optimisticMessagesStore';

const START_INDEX = 1000000;

export const useDiscussionMessages = (
  discussionId: string,
  nodes: DiscussionMessage[]
) => {
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
  const [items, setItems] = useState<Item[]>([]);

  const optimisticMessages = useStore(
    useCallback((state) => state.messagesByDiscussionId[discussionId] || [], [
      discussionId,
    ])
  );

  const messages = useMemo(() => nodes.concat(optimisticMessages), [
    nodes,
    optimisticMessages,
  ]);

  const recentMessages = useMemo(() => getRecentMessages(items), [items]);

  useEffect(() => {
    // `items` need to be handled in state rather than memoized in order for
    // `followOutput` to work properly.
    const items = generateItems(messages);
    setItems(items);
    setFirstItemIndex(START_INDEX - items.length);
  }, [messages]);

  return { firstItemIndex, items, recentMessages, optimisticMessages };
};
