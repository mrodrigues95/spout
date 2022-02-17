import { useCallback, useMemo } from 'react';
import {
  DiscussionMessage,
  generateItems,
  getMyRecentMessages,
} from '../utils/messages';
import { useStore } from '../utils/optimisticMessagesStore';

export const useDiscussionMessages = (
  discussionId: string,
  nodes: DiscussionMessage[]
) => {
  const optimisticMessages = useStore(
    useCallback((state) => state.messagesByDiscussionId[discussionId] || [], [
      discussionId,
    ])
  );

  const messages = useMemo(() => nodes.concat(optimisticMessages), [
    nodes,
    optimisticMessages,
  ]);

  const data = useMemo(() => {
    const items = generateItems(messages);
    const recentMessages = getMyRecentMessages(items);

    return { items, recentMessages };
  }, [messages]);

  return { data };
};
