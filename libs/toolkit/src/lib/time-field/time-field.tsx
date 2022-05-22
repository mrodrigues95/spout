import { useRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import {
  DateFieldState,
  TimeFieldStateOptions,
  useTimeFieldState,
} from '@react-stately/datepicker';
import { useTimeField } from '@react-aria/datepicker';
import clsx from 'clsx';
import { DatePickerLabel, DateSegment } from '../date-picker';

export interface TimeFieldProps
  extends Omit<TimeFieldStateOptions, 'errorMessage' | 'locale'> {
  errorMessage?: string;
  handleState?: (state: DateFieldState) => void;
}

export const TimeField = ({
  errorMessage,
  handleState,
  ...props
}: TimeFieldProps) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);

  const isInvalid = state.validationState === 'invalid';

  return (
    <div className="flex flex-col items-start space-y-1.5">
      <DatePickerLabel
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        label={props.label}
        {...labelProps}
      />
      <div
        {...fieldProps}
        ref={ref}
        className={clsx(
          'relative flex w-full items-center rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none',
          'transition duration-150 ease-in-out',
          isInvalid
            ? 'focus-within:border-red-700 focus-within:ring-4 focus-within:ring-red-200'
            : 'focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-200',
        )}
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
};
