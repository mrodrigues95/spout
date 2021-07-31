import create from 'zustand';
import { Message_Message } from '../utils/__generated__/fragments.generated';
import { UserInfo_User } from '../utils/__generated__/fragments.generated';

let optimisticId = -1;
const getOptimisticId = () => optimisticId--;

export interface OptimisticMessage extends Message_Message {
  optimisticId: number;
}

interface MessagesStore {
  messagesByDiscussionId: { [key: string]: OptimisticMessage[] };
  add: (
    discussionId: string,
    message: string,
    createdBy: UserInfo_User
  ) => void;
  remove: (discussionId: string, optimisticMessageId: number) => void;
}

export const useStore = create<MessagesStore>((set) => ({
  messagesByDiscussionId: {},
  add: (discussionId: string, message: string, createdBy: UserInfo_User) =>
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
              body: message,
              createdAt: new Date().toISOString(),
              createdBy: createdBy,
            },
          ],
        },
      };
    }),
  remove: (discussionId: string, optimisticMessageId: number) =>
    set((state) => {
      if (!state.messagesByDiscussionId[discussionId]) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // If a message at this index is found, remove it.
      const messageIndex = state.messagesByDiscussionId[discussionId].findIndex(
        (message: OptimisticMessage) =>
          message.optimisticId === optimisticMessageId
      );

      if (messageIndex === -1) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      const messages = state.messagesByDiscussionId[discussionId].filter(
        (_, i) => i !== messageIndex
      );

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: messages,
        },
      };
    }),
}));
