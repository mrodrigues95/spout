import { differenceInDays, format, formatDistance } from 'date-fns';
import { Message_Message } from '../utils/__generated__/fragments.generated';
import { OptimisticMessage } from './messagesStore';

/**
 * Formats chat message dates as follows:
 *
 * 1. If the message was created today -> Today at `date`.
 * 2. If the message was created yesterday -> Yesterday at `date`.
 * 3. In any other case -> `MMM d, yyyy`.
 * @param date The date to be formatted.
 * @returns The formatted date.
 */
export const formatMessageDate = (date: string | Date): string => {
  const now = new Date();
  const to = new Date(date);
  if (differenceInDays(now, to) === 0) {
    return formatDistance(to, now, { addSuffix: true });
  } else if (differenceInDays(now, to) === 1) {
    return `Yesterday at ${format(to, 'p')}`;
  }
  return format(to, 'MMM d, yyyy');
};

interface GroupedDays {
  [date: string]: (OptimisticMessage | Message_Message)[];
}

/**
 * Groups an array of messages by date.
 */
export const groupMessagesByDate = (
  messages: (OptimisticMessage | Message_Message)[]
): GroupedDays =>
  messages.reduce((acc: GroupedDays, message) => {
    const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
    return { ...acc, [createdAt]: [...(acc[createdAt] || []), message] };
  }, {});

export interface Day {
  id: string;
  date: string;
  type: string;
}

export type Item = OptimisticMessage | Message_Message | Day;

/**
 * Generates a flattened array of messages which are sorted and seperated by date.
 *
 * This is required so that we can provide these items to Virtuoso and utilize
 * message dividers in the chat.
 */
export const generateItems = (
  messages: (OptimisticMessage | Message_Message)[]
): Item[] => {
  const days = groupMessagesByDate(messages);

  // TODO: We're sorting the indexes here but we don't actually sort
  // the array of messages for each date anywhere before this. This means
  // the sorting of messages might be flakey. 
  const sortedDays = Object.keys(days).sort(
    (x, y) => new Date(x).getTime() - new Date(y).getTime()
  );

  const items = sortedDays.reduce((acc: Item[], day) => {
    const messagesForDay = [...days[day].reverse()];
    return [...acc, { type: 'day', date: day, id: day }, ...messagesForDay];
  }, []);

  return items;
};

/**
 * Formats out multiple line breaks (2 max).
 * @param message The message to be formatted.
 * @return The formatted message.
 */
export const formatNewMessage = (message: string): string => {
  return message.replace(/(\r\n|\r|\n){3,}/g, '$1\n\n');
};
