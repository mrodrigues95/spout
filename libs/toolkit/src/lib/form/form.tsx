import { ComponentProps } from 'react';
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodSchema, TypeOf } from 'zod';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { FormSubmitButton } from './form-submit-button';
import { FormInput } from './form-input';
import { FormTextArea } from './form-textarea';
import { FormDatePicker } from './form-datepicker';
import { FormTimeField } from './form-timefield';

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => {
  return useForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};

interface FieldErrorProps {
  error?: any;
}

export function FieldError({ error }: FieldErrorProps) {
  if (!error) return null;

  return (
    <span className="whitespace-pre text-xs font-medium italic text-red-600">
      {error.message}
    </span>
  );
}

export interface FormProps<T extends FieldValues = any>
  extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge(clsx('flex flex-col space-y-3', className))}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.SubmitButton = FormSubmitButton;
Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.DatePicker = FormDatePicker;
Form.TimeField = FormTimeField;
