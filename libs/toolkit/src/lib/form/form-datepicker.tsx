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
  const { setError, clearErrors } = useFormContext();
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors, isSubmitted },
  } = useController({ ...controller });

  console.log(isSubmitted);

  if (!controller.defaultValue) {
    throw new Error('defaultValue is required!');
  }

  const handleState = useCallback(
    (state: DatePickerState) => {
      if (
        state.validationState === 'invalid' &&
        isSubmitted &&
        !errors[controller.name]
      ) {
        setError(
          controller.name,
          { type: 'custom', message: errorMessage },
          { shouldFocus: true },
        );
      } else if (state.validationState === 'valid' && errors[controller.name]) {
        clearErrors(controller.name);
      }
    },
    [errors, controller.name, setError, isSubmitted, errorMessage, clearErrors],
  );

  return (
    <DatePicker
      {...props}
      ref={ref}
      handleState={handleState}
      isFormError={!!errors[controller.name]}
      errorMessage={errorMessage}
      value={constructCalendarInstance(value, controller.defaultValue)}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
