import create from 'zustand';
import { Message_Message } from '../components/Messages/__generated__/index.generated';
import { UserInfo_User } from '../components/__generated__/Discussion.generated';

let optimisticId = -1;
const getOptimisticId = () => optimisticId--;

export interface OptimisticMessageType extends Message_Message {
  optimisticId: number;
}

interface MessagesStore {
  messagesByDiscussionId: { [index: string]: OptimisticMessageType[] };
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

      state.messagesByDiscussionId[discussionId].unshift({
        id: discussionId,
        optimisticId: getOptimisticId(),
        body: message,
        createdAt: String(Date.now()),
        createdBy: createdBy,
      });
    }),
  remove: (discussionId: string, optimisticMessageId: number) =>
    set((state) => {
      if (!state.messagesByDiscussionId[discussionId]) {
        return;
      }

      // If a message at this index is found, remove it.
      const messageIndex = state.messagesByDiscussionId[discussionId].findIndex(
        (message: OptimisticMessageType) =>
          message.optimisticId === optimisticMessageId
      );

      if (messageIndex === -1) {
        return;
      }

      state.messagesByDiscussionId[discussionId].splice(messageIndex, 1);
    }),
}));
