import { differenceInMinutes, format } from 'date-fns';
import { Message_Message } from './__generated__/fragments.generated';
import { OptimisticMessage } from './messagesStore';

type Message = OptimisticMessage | Message_Message;
type Messages = Message[];

interface GroupedMessages {
  [date: string]: Messages;
}

/**
 * Groups an array of messages by date and formats each date to be
 * `MMM d, yyyy`.
 *
 * @param messages The array of messages that require grouping.
 * @returns An object containing messages groups which is indexed by `date`.
 */
export const group = (messages: Messages): GroupedMessages =>
  messages.reduce((acc: GroupedMessages, message) => {
    const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
    return { ...acc, [createdAt]: [...(acc[createdAt] || []), message] };
  }, {});

/**
 * Sorts message groups by date in descending order.
 *
 * @param groups The groups of messages that require sorting.
 * @returns A sorted map which is keyed by `date`.
 */
const sort = (groups: GroupedMessages) => {
  const days = { ...groups };

  const getTime = (date: string) => new Date(date).getTime();

  Object.entries(days).forEach(([_, messages]) =>
    messages
      .sort((x, y) => getTime(x.createdAt) - getTime(y.createdAt))
      .reverse()
  );

  const sortedDays = Object.keys(days)
    .sort((x, y) => getTime(x) - getTime(y))
    .reverse()
    .reduce(
      (acc: GroupedMessages, day) => ({ ...acc, [day]: [...days[day]] }),
      {}
    );

  // Returning a map gurantees sort order is respected when being iterated on.
  return new Map(Object.entries(sortedDays));
};

/**
 * A shorthand for `group()` and `sort()`.
 *
 * @param messages The array of messages that require normalization.
 * @returns A sorted map which is keyed by `date`.
 */
const normalize = (messages: Messages) => {
  const groups = group(messages);
  return sort(groups);
};

export interface Divider {
  id: string;
  date: string;
  type: string;
}

export type Item = Message | Divider;

/**
 * Normalizes the messages by calling `normalize()` and then flattens the map
 * and inserts a message divider between each date.
 *
 * @param messages The array of messages that require normalization.
 * @returns An array of items.
 */
export const generateItems = (messages: Messages): Item[] => {
  const days = normalize(messages);

  const items: Item[] = [];
  for (const [day, messages] of days) {
    items.push(...messages, { type: 'divider', date: day, id: day });
  }

  return items.reverse();
};

export const isOptimistic = (item: Item) =>
  'optimisticId' in item && item.optimisticId < 0;

export const isDivider = (item: Item) =>
  'type' in item && item.type === 'divider';

export const isEvent = (item: Item) =>
  'isDiscussionEvent' in item && item.discussionEvent;

const isMessage = (item: Item) =>
  !(isOptimistic(item) || isDivider(item) || isEvent(item));

export interface RecentMessage {
  message: Message_Message;
  isBefore: string | null;
  isAfter: string | null;
  isRecent: boolean;
  isFirstMessage: boolean;
  isLastMessage: boolean;
  isMiddleMessage: boolean;
}

export type RecentMessages = Record<string, RecentMessage>;

/**
 * Filters messages that have been sent by the same user within the
 * past five minutes.
 * 
 * This function is primarily used for styling recently sent messages
 * from the same user.
 * 
 * @param items An array of `items`.
 * @returns An `object` containing recently grouped messages.
 */
export const getRecentMessages = (items: Item[]) => {
  // Validate that the messages are within a five minute threshold of eachother.
  const isRecent = (d1: string, d2: string) => {
    return differenceInMinutes(new Date(d1), new Date(d2)) < 5;
  };

  const isCreatedByUser = (m1: Message_Message, m2: Message_Message) => {
    return m1.createdBy.id === m2.createdBy.id;
  };

  return items.reduce((acc: RecentMessages, item, idx) => {
    const prevItem: Item | undefined = items[idx - 1];
    const nextItem: Item | undefined = items[idx + 1];

    if (!prevItem && !nextItem) return acc;
    if (!isMessage(item)) return acc;

    const currentMessage = item as Message_Message;
    const rm: RecentMessage = {
      message: currentMessage,
      isBefore: null,
      isAfter: null,
      isRecent: false,
      isFirstMessage: false,
      isMiddleMessage: false,
      isLastMessage: false,
    };

    if (prevItem && isMessage(prevItem)) {
      const prevMessage = prevItem as Message_Message;

      if (
        isCreatedByUser(prevMessage, currentMessage) &&
        isRecent(currentMessage.createdAt, prevMessage.createdAt)
      ) {
        rm.isRecent = true;
        rm.isAfter = prevMessage.id;
      }
    }

    if (nextItem && isMessage(nextItem)) {
      const nextMessage = nextItem as Message_Message;

      if (
        isCreatedByUser(nextMessage, currentMessage) &&
        isRecent(nextMessage.createdAt, currentMessage.createdAt)
      ) {
        rm.isRecent = true;
        rm.isBefore = nextMessage.id;
      }
    }

    if (!rm.isRecent) return acc;

    return {
      ...acc,
      [currentMessage.id]: {
        ...rm,
        isFirstMessage: !!(rm.isBefore && !(rm.isBefore && rm.isAfter)),
        isMiddleMessage: !!(rm.isBefore && rm.isAfter),
        isLastMessage: !!(rm.isAfter && !(rm.isBefore && rm.isAfter)),
      },
    };
  }, {});
};
