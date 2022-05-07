import { Story, Meta } from '@storybook/react';
import { date, object, string } from 'zod';
import { Form, FormProps, useZodForm } from './form';

export default {
  component: Form,
  title: 'Form',
} as Meta;

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
  comment: string().min(1, { message: '- Invalid comment' }),
  dob: date({
    required_error: '- Invalid date',
    invalid_type_error: '- Invalid date',
  }),
});

export const Primary: Story<FormProps> = () => {
  const form = useZodForm({
    schema: loginSchema,
    defaultValues: { dob: new Date() },
  });

  return (
    <Form
      className="flex w-full flex-col"
      form={form}
      onSubmit={(values) => console.log(values)}
    >
      <Form.Input
        label="Email"
        placeholder="Email"
        type="email"
        {...form.register('email')}
      />
      <Form.Input
        label="Password"
        placeholder="Password"
        type="password"
        {...form.register('password')}
      />
      <Form.TextArea
        label="Comment"
        placeholder="Comment"
        {...form.register('comment')}
      />
      <Form.DatePicker
        controller={{
          name: 'dob',
          control: form.control,
        }}
        inputProps={{ label: 'Date of birth', placeholder: 'Date of Birth' }}
      />
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
