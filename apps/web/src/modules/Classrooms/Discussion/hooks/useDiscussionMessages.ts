import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DiscussionMessage,
  generateItems,
  getRecentMessages,
  Item,
  RecentMessages,
} from '../utils/messages';
import { useStore } from '../utils/optimisticMessagesStore';

interface DiscussionMessagesListData {
  items: Item[];
  recentMessages: RecentMessages;
}

const START_INDEX = 1000000;

export const useDiscussionMessages = (
  discussionId: string,
  nodes: DiscussionMessage[]
) => {
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);
  const [data, setData] = useState<DiscussionMessagesListData>({
    items: [],
    recentMessages: {},
  });

  const optimisticMessages = useStore(
    useCallback((state) => state.messagesByDiscussionId[discussionId] || [], [
      discussionId,
    ])
  );

  const messages = useMemo(() => nodes.concat(optimisticMessages), [
    nodes,
    optimisticMessages,
  ]);

  const hasOptimisticMessages = useMemo(() => !!optimisticMessages.length, [
    optimisticMessages.length,
  ]);

  useEffect(() => {
    const items = generateItems(messages);
    const recentMessages = getRecentMessages(items);

    setData({ items, recentMessages });
    setFirstItemIndex(START_INDEX - items.length);
  }, [messages]);

  return { data, firstItemIndex, hasOptimisticMessages };
};
