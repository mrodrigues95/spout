import { differenceInDays, format, formatDistance } from 'date-fns';
import { Message_Message } from '../utils/__generated__/fragments.generated';
import { OptimisticMessage } from './messagesStore';

type Message =
  | {
      type: 'day' | 'message' | 'optimistic';
    }
  | OptimisticMessage
  | Message_Message
  | Day;

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
  [id: string]: (OptimisticMessage | Message_Message)[];
}

/**
 * Groups an array of messages by date.
 * @param messages An array of messages.
 * @returns An `object` who's keys are grouped by date.
 */
export const groupMessagesByDate = (
  messages: (OptimisticMessage | Message_Message)[] = []
): GroupedDays => {
  return messages.reduce((acc: GroupedDays, message) => {
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

// TODO: Merge OptimisticMessage | Message_Message | Day into one type
// that has a `type` key which will be used to differentiate the types.
export interface Day {
  id: string;
  type: string;
  date: string;
}

export const generateItems = (
  messages: (OptimisticMessage | Message_Message)[]
): (OptimisticMessage | Message_Message | Day)[] => {
  const days = groupMessagesByDate(messages);
  const sortedDays = Object.keys(days).sort();

  console.log(sortedDays);

  const items = sortedDays.reduce(
    (acc: (OptimisticMessage | Message_Message | Day)[], date) => {
      const sortedMessages = days[date].sort(
        (x, y) =>
          new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime()
      );
      return [...acc, { type: 'day', date, id: date }, ...sortedMessages];
    },
    []
  );

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
