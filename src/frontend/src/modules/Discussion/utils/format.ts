import { differenceInDays, format, formatDistance } from 'date-fns';
import { Message_Message } from '../components/Messages/__generated__/index.generated';
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

type GroupedMessagesByDate = {
  [id: string]:  (OptimisticMessage | Message_Message)[];
};

/**
 * Groups an array of messages by date.
 * @param messages An array of messages.
 * @returns An `object` who's keys are grouped by date or `null`.
 */
export const groupMessagesByDate = (
  messages: (OptimisticMessage | Message_Message)[]
): GroupedMessagesByDate | null => {
  if (!messages.length) return null;

  return messages.reduce((acc: GroupedMessagesByDate, message) => {
    if (differenceInDays(new Date(), new Date(message.createdAt)) === 0) {
      return { ...acc, Today: [...(acc['Today'] || []), message] };
    } else if (
      differenceInDays(new Date(), new Date(message.createdAt)) === 1
    ) {
      return { ...acc, Yesterday: [...(acc['Yesterday'] || []), message] };
    }
    const createdAt = format(new Date(message.createdAt), 'MMM d, yyyy');
    return { ...acc, [createdAt]: [...(acc[createdAt] || []), message] };
  }, {});
};

/**
 * Formats out multiple line breaks (2 max).
 * @param message The message to be formatted.
 * @return The formatted message.
 */
export const formatNewMessage = (message: string): string => {
  return message.replace(/(\r\n|\r|\n){3,}/g, '$1\n\n');
};
