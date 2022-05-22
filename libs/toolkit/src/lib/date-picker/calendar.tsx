import { useCalendarState } from '@react-stately/calendar';
import {
  CalendarProps as AriaCalendarProps,
  useCalendar,
} from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { createCalendar, DateValue } from '@internationalized/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { CalendarButton } from './calendar-button';
import { CalendarGrid } from './calendar-grid';

export interface CalendarProps extends AriaCalendarProps<DateValue> {}

export const Calendar = ({ ...props }: CalendarProps) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div {...calendarProps} className="inline-block text-gray-900">
      <div className="flex items-center pb-4">
        <h2 className="ml-2 flex-1 font-semibold">{title}</h2>
        <div className="flex items-center space-x-1.5">
          <CalendarButton {...prevButtonProps}>
            <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
          </CalendarButton>
          <CalendarButton {...nextButtonProps}>
            <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
          </CalendarButton>
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
};
