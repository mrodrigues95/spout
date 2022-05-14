import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { DatePicker, DatePickerProps } from '../date-picker';
import { Form } from './form';
import { FormInputProps } from './form-input';

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
> extends Omit<DatePickerProps, 'onChange' | 'selected' | 'onBlur'> {
  inputProps: FormInputProps;
  controller: UseControllerProps<TFieldValues>;
}

export const FormDatePicker = <TFieldValues extends FieldValues = FieldValues>({
  controller,
  inputProps,
  ...props
}: FormDatePickerProps<TFieldValues>) => {
  const {
    field: { name, onChange, onBlur, value, ref },
  } = useController({ ...controller });

  return (
    <DatePicker
      {...props}
      selected={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      placeholderText={inputProps.placeholder}
      customInput={<Form.Input {...inputProps} ref={ref} />}
    />
  );
};
