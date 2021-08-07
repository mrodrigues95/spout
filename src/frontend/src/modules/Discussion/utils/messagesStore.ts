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

// TODO: Maybe we can store optimistic messages and live messages here as a way
// to reduce renders and update the query cache?
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
              createdBy: createdBy
            },
          ],
        },
      };
    }),
  remove: (discussionId: string, optimisticMessageId: number) =>
    set((state) => {
      console.log('Attempting to remove message from store...')
      if (!state.messagesByDiscussionId[discussionId]) {
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      // If a message at this index is found, remove it.
      const messageIndex = state.messagesByDiscussionId[discussionId].findIndex(
        (message: OptimisticMessage) =>
          message.optimisticId === optimisticMessageId
      );

      if (messageIndex === -1) {
        console.log('No index found for this message.')
        return { messagesByDiscussionId: { ...state.messagesByDiscussionId } };
      }

      const messages = state.messagesByDiscussionId[discussionId].filter(
        (_, i) => i !== messageIndex
      );

      console.log('Removed message from store.')

      return {
        messagesByDiscussionId: {
          ...state.messagesByDiscussionId,
          [discussionId]: messages,
        },
      };
    }),
}));
