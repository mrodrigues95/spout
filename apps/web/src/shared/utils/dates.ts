import { format, isToday, isYesterday } from 'date-fns';

/**
 * Formats chat message dates as follows:
 *
 * 1. If `customFormat` is passed in, use that instead.
 * 2. If the message was created today -> Today at `date`.
 * 3. If the message was created yesterday -> Yesterday at `date`.
 * 4. In any other case -> `MMM d, yyyy`.
 * @param date The date to be formatted.
 * @returns The formatted date.
 */
export const formatMessageDate = (
  date: string | Date,
  customFormat?: string,
): string => {
  const _date = new Date(date);

  if (customFormat) return format(_date, customFormat);

  if (isToday(_date)) {
    return `Today at ${format(_date, 'p')}`;
  } else if (isYesterday(_date)) {
    return `Yesterday at ${format(_date, 'p')}`;
  }
  return format(_date, 'MMM d, yyyy');
};

export const getTime = (date: string) => new Date(date).getTime();
