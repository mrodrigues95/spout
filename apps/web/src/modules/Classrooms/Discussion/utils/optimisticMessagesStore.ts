import create from 'zustand';
import { OptimisticDiscussionMessage } from './messages';

let optimisticId = -1;
const getOptimisticId = () => optimisticId--;

const findMessageIndex = (
  discussionId: string,
  optimisticMessageId: number,
  state: OptimisticMessagesStore,
) => {
  const messages = state.messagesByDiscussionId[discussionId];
  return messages.findIndex(
    (message: OptimisticDiscussionMessage) =>
      message.optimisticId === optimisticMessageId,
  );
};

export interface OptimisticMessagesStore {
  messagesByDiscussionId: { [key: string]: OptimisticDiscussionMessage[] };
  add: (
    discussionId: string,
    {
      content,
      attachmentIds,
      createdBy,
    }: Pick<
      OptimisticDiscussionMessage,
      'content' | 'attachmentIds' | 'createdBy'
    >,
  ) => void;
  remove: (discussionId: string, optimisticMessageId: number) => void;
  markIsSent: (
    discussionId: string,
    optimisticMessageId: number,
    isSent: boolean,
  ) => void;
}

export const useStore = create<OptimisticMessagesStore>((set) => ({
  messagesByDiscussionId: {},
  add: (
    discussionId: string,
    {
      content,
      attachmentIds,
      createdBy,
    }: Pick<
      OptimisticDiscussionMessage,
      'content' | 'attachmentIds' | 'createdBy'
    >,
  ) =>
    set((state) => {
      // Initialize an empty array if this is a new discussion.
      if (!state.messagesByDiscussionId[discussionId]) {
        state.messagesByDiscussionId[discussionId] = [];
      }

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: [
            ...state.messagesByDiscussionId[discussionId],
            {
              id: discussionId,
              optimisticId: getOptimisticId(),
              content: content,
              createdAt: new Date().toISOString(),
              isDiscussionEvent: false,
              discussionEvent: null,
              isSent: false,
              attachmentIds,
              createdBy,
              pinnedBy: null
            },
          ],
        },
      };
    }),
  markIsSent: (
    discussionId: string,
    optimisticMessageId: number,
    isSent: boolean,
  ) =>
    set((state) => {
      if (!state.messagesByDiscussionId[discussionId]) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // Get the message.
      const index = findMessageIndex(discussionId, optimisticMessageId, state);
      if (index === -1) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // Update it.
      const messages = [...state.messagesByDiscussionId[discussionId]];
      messages[index].isSent = isSent;

      console.log('Successfully update optimistic message in store');

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: messages,
        },
      };
    }),
  remove: (discussionId: string, optimisticMessageId: number) =>
    set((state) => {
      if (!state.messagesByDiscussionId[discussionId]) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // Get the message.
      const index = findMessageIndex(discussionId, optimisticMessageId, state);
      if (index === -1) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // Remove it.
      const messages = state.messagesByDiscussionId[discussionId].filter(
        (_, i) => i !== index,
      );

      console.log('Successfully removed optimistic message from store');

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: [...messages],
        },
      };
    }),
}));
