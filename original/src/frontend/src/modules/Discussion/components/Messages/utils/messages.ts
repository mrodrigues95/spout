import { format } from 'date-fns';
import { Message_Message } from '../../../utils/__generated__/fragments.generated';
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
 * and inserts a message divier between each date.
 * 
 * This is only required for the time being because `GroupedVirtuoso` doesn't
 * support prepending items.
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
