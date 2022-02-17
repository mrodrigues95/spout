import { useCallback } from 'react';
import { DiscussionMessage, isMessage, Item } from '../utils/messages';
import { useStore } from '../utils/optimisticMessagesStore';

export const useShouldForceScrollToBottom = (
  discussionId: string,
  meId: string,
  items: Item[]
) => {
  const optimisticMessages = useStore(
    useCallback((state) => state.messagesByDiscussionId[discussionId] || [], [
      discussionId,
    ])
  );

  // If the last message was created by the current user, then they should
  // be scrolled to the bottom of the list.
  const checkForMyNewMessage = useCallback(() => {
    if (!items.length) return false;

    const prevItem = items[items.length - 1];
    const hasOptimisticMessages = !!optimisticMessages.length;

    if (
      !isMessage(prevItem) ||
      !hasOptimisticMessages ||
      (prevItem as DiscussionMessage).createdBy.id !== meId
    ) {
      return false;
    }

    return true;
  }, [items, meId, optimisticMessages.length]);

  return checkForMyNewMessage;
};
