import { useCallback } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { DatePickerState } from '@react-stately/datepicker';
import { CalendarDate, DateValue } from '@internationalized/date';
import { DatePicker, DatePickerProps } from '../date-picker';

// Since `onChange` using the spread operator, this causes the `value`
// to lose its inheritance so we need to construct a new instance.
const constructCalendarInstance = (
  value: DateValue,
  defaultValue: CalendarDate,
) => {
  const tempValue = value ? value : defaultValue;

  return tempValue instanceof CalendarDate
    ? tempValue
    : new CalendarDate(
        tempValue.calendar,
        tempValue.era,
        tempValue.year,
        tempValue.month,
        tempValue.day,
      );
};

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> extends DatePickerProps {
  controller: UseControllerProps<TFieldValues>;
}

export const FormDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  controller,
  errorMessage,
  ...props
}: FormDatePickerProps<TFieldValues>) => {
  const { setError } = useFormContext();
  const {
    field: { onChange, onBlur, value },
    formState: { errors },
  } = useController({ ...controller });

  if (!controller.defaultValue) {
    throw new Error('defaultValue is required!');
  }

  const handleState = useCallback(
    (state: DatePickerState) => {
      if (state.validationState === 'invalid' && !errors[controller.name]) {
        setError(controller.name, { type: 'custom', message: errorMessage });
      }
    },
    [errors, controller.name, setError, errorMessage],
  );

  return (
    <DatePicker
      {...props}
      handleState={handleState}
      errorMessage={errorMessage}
      value={constructCalendarInstance(value, controller.defaultValue)}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
