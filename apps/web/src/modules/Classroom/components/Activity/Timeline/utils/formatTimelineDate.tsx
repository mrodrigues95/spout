import { format, formatDistance, isToday, isYesterday } from 'date-fns';

export const formatTimelineDate = (date: string | Date): string => {
  const _date = new Date(date);

  if (isToday(_date)) {
    return formatDistance(_date, new Date(), { addSuffix: true });
  } else if (isYesterday(_date)) {
    return `Yesterday`;
  }

  return format(_date, 'MMM d, yyyy');
};
