import { useLocale } from '@react-aria/i18n';
import { AriaCalendarGridProps, useCalendarGrid } from '@react-aria/calendar';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { startOfWeek, getWeeksInMonth } from '@internationalized/date';
import { CalendarCell } from './calendar-cell';

export interface CalendarGridProps extends AriaCalendarGridProps {
  state: CalendarState | RangeCalendarState;
}

export const CalendarGrid = ({ state, ...props }: CalendarGridProps) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Find the start date of the grid, which is the beginning
  // of the week the month starts in. Also get the number of
  // weeks in the month so we can render the proper number of rows.
  const firstDate = startOfWeek(state.visibleRange.start, locale);
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} className="flex-1">
      <thead {...headerProps} className="text-gray-900">
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center font-medium text-gray-700" key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {[...new Array(7).keys()].map((dayIndex) => (
              <CalendarCell
                key={dayIndex}
                state={state}
                date={firstDate.add({ weeks: weekIndex, days: dayIndex })}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
