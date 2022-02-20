import { differenceInMinutes, format } from 'date-fns';
import { getTime } from './dates';
import { DiscussionMessagesList_discussion$data } from '../components/DiscussionMessages/DiscussionMessagesList/__generated__/DiscussionMessagesList_discussion.graphql';
import { DiscussionMessagesList_user$data } from '../components/DiscussionMessages/DiscussionMessagesList/__generated__/DiscussionMessagesList_user.graphql';

export type Me = DiscussionMessagesList_user$data;

export type BaseDiscussionMessage = NonNullable<
  NonNullable<DiscussionMessagesList_discussion$data['messages']>['edges']
>[number]['node'];

export interface OptimisticDiscussionMessage
  extends Omit<BaseDiscussionMessage, 'attachments'> {
  optimisticId: number;
  attachmentIds: string[];
  isSent: boolean;
}

export type DiscussionMessage =
  | BaseDiscussionMessage
  | OptimisticDiscussionMessage;

interface GroupedDiscussionMessages {
  [date: string]: DiscussionMessage[];
}

/**
 * Groups an array of messages by date and formats each date to be
 * `MMM d, yyyy`.
 *
 * @param messages The array of messages that require grouping.
 * @returns An object containing messages groups which is indexed by `date`.
 */
const group = (
  messages: DiscussionMessage[]
): GroupedDiscussionMessages =>
  messages.reduce((acc: GroupedDiscussionMessages, message) => {
    const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
    return { ...acc, [createdAt]: [...(acc[createdAt] || []), message] };
  }, {});

/**
 * Sorts message groups by date in descending order.
 *
 * @param groups The groups of messages that require sorting.
 * @returns A sorted map which is keyed by `date`.
 */
const sort = (groups: GroupedDiscussionMessages) => {
  const days = { ...groups };

  Object.entries(days).forEach(([_, messages]) =>
    messages
      .sort((x, y) => getTime(x.createdAt) - getTime(y.createdAt))
      .reverse()
  );

  const sortedDays = Object.keys(days)
    .sort((x, y) => getTime(x) - getTime(y))
    .reverse()
    .reduce(
      (acc: GroupedDiscussionMessages, day) => ({
        ...acc,
        [day]: [...days[day]],
      }),
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
const normalize = (messages: DiscussionMessage[]) => {
  const groups = group(messages);
  return sort(groups);
};

export interface Divider {
  id: string;
  date: string;
  type: string;
}

export type Item = DiscussionMessage | OptimisticDiscussionMessage | Divider;

/**
 * Normalizes the messages by calling `normalize()` and then flattens the map
 * and inserts a message divider between each date.
 *
 * @param messages The array of messages that require normalization.
 * @returns An array of items.
 */
export const generateItems = (messages: DiscussionMessage[]): Item[] => {
  const days = normalize(messages);

  const items: Item[] = [];
  for (const [day, messages] of days) {
    items.push(...messages, { type: 'divider', date: day, id: day });
  }

  return items.reverse();
};

export const isOptimistic = (item: Item) =>
  Boolean('optimisticId' in item && item.optimisticId && item.optimisticId < 0);

export const isDivider = (item: Item) =>
  'type' in item && item.type === 'divider';

export const isEvent = (item: Item) =>
  'isEvent' in item && !!item.messageEvent;

export const isMessage = (item: Item) => !(isDivider(item) || isEvent(item));

export interface RecentMessage {
  message: DiscussionMessage;
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
export const getMyRecentMessages = (items: Item[]) => {
  // Validate that the messages are within a five minute threshold of eachother.
  const isRecent = (d1: string, d2: string) => {
    return differenceInMinutes(new Date(d1), new Date(d2)) < 5;
  };

  const isCreatedByUser = (m1: DiscussionMessage, m2: DiscussionMessage) => {
    return m1.createdBy.id === m2.createdBy.id;
  };

  return items.reduce((acc: RecentMessages, item, idx) => {
    const prevItem: Item | undefined = items[idx - 1];
    const nextItem: Item | undefined = items[idx + 1];

    if (!prevItem && !nextItem) return acc;
    if (!isMessage(item)) return acc;

    const currentMessage = item as DiscussionMessage;
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
      const prevMessage = prevItem as DiscussionMessage;
      if (
        isCreatedByUser(prevMessage, currentMessage) &&
        isRecent(currentMessage.createdAt, prevMessage.createdAt)
      ) {
        rm.isRecent = true;
        rm.isAfter = prevMessage.id;
      }
    }

    if (nextItem && isMessage(nextItem)) {
      const nextMessage = nextItem as DiscussionMessage;
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
