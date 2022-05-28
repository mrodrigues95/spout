import { useCallback } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import { DateFieldState } from '@react-stately/datepicker';
import { TimeValue } from '@react-types/datepicker';
import { Time } from '@internationalized/date';
import { TimeField, TimeFieldProps } from '../time-field';

// Since `onChange` using the spread operator, this causes the `value`
// to lose its inheritance so we need to construct a new instance.
const constructTimeInstance = (value: TimeValue, defaultValue: Time) => {
  const tempValue = value ? value : defaultValue;

  return tempValue instanceof Time
    ? tempValue
    : new Time(
        tempValue.hour,
        tempValue.minute,
        tempValue.second,
        tempValue.millisecond,
      );
};

export interface FormTimeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> extends TimeFieldProps {
  controller: UseControllerProps<TFieldValues>;
}

export const FormTimeField = <TFieldValues extends FieldValues = FieldValues>({
  controller,
  errorMessage,
  ...props
}: FormTimeFieldProps<TFieldValues>) => {
  const { setError, clearErrors } = useFormContext();
  const {
    field: { onChange, onBlur, value, ref },
    formState: { errors, isSubmitted },
  } = useController({ ...controller });

  if (!controller.defaultValue) {
    throw new Error('defaultValue is required!');
  }

  const handleState = useCallback(
    (state: DateFieldState) => {
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
    [isSubmitted, errors, controller.name, setError, errorMessage, clearErrors],
  );

  return (
    <TimeField
      {...props}
      ref={ref}
      handleState={handleState}
      isFormError={!!errors[controller.name]}
      errorMessage={errorMessage}
      value={constructTimeInstance(value, controller.defaultValue)}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};
