import create from 'zustand';
import { Message_Message } from '../utils/__generated__/fragments.generated';
import { UserInfo_User } from '../utils/__generated__/fragments.generated';

let optimisticId = -1;
const getOptimisticId = () => optimisticId--;

export interface OptimisticMessage extends Message_Message {
  optimisticId: number;
}

interface MessagesStore {
  messagesByDiscussionId: { [index: string]: OptimisticMessage[] };
  add: (discussionId: string, message: string, createdBy: UserInfo_User) => void;
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
            {
              id: discussionId,
              optimisticId: getOptimisticId(),
              body: message,
              createdAt: new Date().toString(),
              createdBy: createdBy,
            },
            ...state.messagesByDiscussionId[discussionId],
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

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: state.messagesByDiscussionId[discussionId].splice(
            messageIndex,
            1
          ),
        },
      };
    }),
}));
