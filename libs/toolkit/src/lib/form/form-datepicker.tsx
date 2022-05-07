import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { DatePicker, DatePickerProps } from '../date-picker';
import { Form } from './form';
import { FormInputProps } from './form-input';

export interface FormDatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<DatePickerProps, 'onChange' | 'selected' | 'onBlur'> {
  inputProps: FormInputProps;
  controller: UseControllerProps<TFieldValues, TName>;
}

export const FormDatePicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  controller,
  inputProps,
  ...props
}: FormDatePickerProps<TFieldValues, TName>) => {
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
