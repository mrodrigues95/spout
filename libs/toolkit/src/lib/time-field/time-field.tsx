import { forwardRef } from 'react';
import { useLocale } from '@react-aria/i18n';
import { FocusableRef } from '@react-types/shared';
import {
  DateFieldState,
  TimeFieldStateOptions,
  useTimeFieldState,
} from '@react-stately/datepicker';
import { useTimeField } from '@react-aria/datepicker';
import clsx from 'clsx';
import { DatePickerLabel, DateSegment } from '../date-picker';
import { useFocusManagerRef } from '../../hooks';

export interface TimeFieldProps
  extends Omit<TimeFieldStateOptions, 'errorMessage' | 'locale'> {
  isFormError?: boolean;
  errorMessage?: string;
  handleState?: (state: DateFieldState) => void;
}

export const TimeField = forwardRef<FocusableRef<HTMLElement>, TimeFieldProps>(
  ({ errorMessage, handleState, isFormError, ...props }, ref) => {
    const { locale } = useLocale();
    const state = useTimeFieldState({
      ...props,
      locale,
    });

    const domRef = useFocusManagerRef(ref as FocusableRef<HTMLElement>);
    const { labelProps, fieldProps } = useTimeField(props, state, domRef);

    // Prioritize form errors if defined.
    const isError =
      typeof isFormError !== 'undefined'
        ? isFormError
        : state.validationState === 'invalid';

    return (
      <DatePickerLabel
        {...labelProps}
        ref={domRef}
        isError={isError}
        errorMessage={errorMessage}
        label={props.label}
      >
        <div
          {...fieldProps}
          className={clsx(
            'relative flex w-full items-center rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none',
            'transition duration-150 ease-in-out',
            isError
              ? 'focus-within:border-red-700 focus-within:ring-4 focus-within:ring-red-200'
              : 'focus-within:border-blue-700 focus-within:ring-4 focus-within:ring-blue-200',
          )}
        >
          {state.segments.map((segment, i) => (
            <DateSegment key={i} segment={segment} state={state} />
          ))}
        </div>
      </DatePickerLabel>
    );
  },
);
