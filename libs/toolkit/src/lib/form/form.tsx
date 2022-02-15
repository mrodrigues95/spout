import { zodResolver } from '@hookform/resolvers/zod/dist/zod';
import { ComponentProps } from 'react';
import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from 'react-hook-form';
import { ZodSchema, TypeOf } from 'zod';
import { FormSubmitButton } from './form-submit-button';
import { FormInput } from './form-input';
import { FormTextArea } from './form-textarea';

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
  name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];
  if (!error) return null;

  return (
    <span className="text-sm font-medium italic text-red-600" role="alert">
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
  ...props
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        <fieldset
          className="flex flex-col space-y-4"
          disabled={form.formState.isSubmitting}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};

Form.SubmitButton = FormSubmitButton;
Form.Input = FormInput;
Form.TextArea = FormTextArea;
