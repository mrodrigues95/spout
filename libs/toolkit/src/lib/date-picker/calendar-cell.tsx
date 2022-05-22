import { useRef } from 'react';
import { AriaCalendarCellProps, useCalendarCell } from '@react-aria/calendar';
import { useLocale } from '@react-aria/i18n';
import { isSameDay, getDayOfWeek } from '@internationalized/date';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { CalendarState, RangeCalendarState } from '@react-stately/calendar';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export interface CalendarCell {
  state: CalendarState | RangeCalendarState;
  date: AriaCalendarCellProps['date'];
}

export const CalendarCell = ({ state, date }: CalendarCell) => {
  const ref = useRef<HTMLDivElement>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);

  // The start and end date of the selected range will have
  // an emphasized appearance.
  const isSelectionStart =
    'highlightedRange' in state && state.highlightedRange
      ? isSameDay(date, state.highlightedRange.start)
      : isSelected;
  const isSelectionEnd =
    'highlightedRange' in state && state.highlightedRange
      ? isSameDay(date, state.highlightedRange.end)
      : isSelected;

  // We add rounded corners on the left for the first day of the month,
  // the first day of each week, and the start date of the selection.
  // We add rounded corners on the right for the last day of the month,
  // the last day of each week, and the end date of the selection.
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={clsx(
        'relative py-0.5 outline-none',
        isFocusVisible ? 'z-10' : 'z-0',
      )}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={clsx(
          'group h-8 w-8 outline-none',
          isRoundedLeft ? 'rounded-l-lg' : '',
          isRoundedRight ? 'rounded-r-lg' : '',
          //   isSelected ? (isInvalid ? 'bg-red-300' : 'bg-blue-300') : ''
        )}
      >
        <div
          className={twMerge(
            clsx(
              'flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-none outline-none',
              isDisabled && !isInvalid
                ? 'cursor-default text-gray-400'
                : 'text-gray-900',
              // Focus ring, visible while the cell has keyboard focus.
              isFocusVisible && !isDisabled && !isInvalid
                ? 'group-focus:z-2 bg-gray-100 ring ring-offset-2'
                : '',
              // Darker selection background for the start and end.
              isSelectionStart || isSelectionEnd
                ? isInvalid
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                : '',
              // Hover state for cells in the middle of the range.
              isSelected && !isDisabled && !(isSelectionStart || isSelectionEnd)
                ? isInvalid
                  ? 'hover:bg-red-400'
                  : 'hover:bg-blue-400'
                : '',
              // Hover state for non-selected cells.
              !isSelected && !isDisabled ? 'hover:bg-gray-100' : '',
            ),
          )}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
};
