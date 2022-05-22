import { useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import {
  DateFieldState,
  DateSegment as StatelyDateSegment,
  useDateFieldState,
} from '@react-stately/datepicker';
import {
  AriaDatePickerProps,
  useDateField,
  useDateSegment,
} from '@react-aria/datepicker';
import { createCalendar, DateValue } from '@internationalized/date';
import clsx from 'clsx';

export interface DateSegmentProps {
  segment: StatelyDateSegment;
  state: DateFieldState;
}

export const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{ ...segmentProps.style }}
      className={clsx(
        'box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:bg-blue-700 focus:text-white',
        segment.isPlaceholder ? 'text-gray-500' : '',
        segment.isEditable ? 'text-gray-900' : 'text-gray-700',
      )}
    >
      {segment.text}
    </div>
  );
};

export interface DateFieldProps extends AriaDatePickerProps<DateValue> {}

export const DateField = ({ ...props }: DateFieldProps) => {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="flex flex-1">
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
};
