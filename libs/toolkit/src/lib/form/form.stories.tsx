import { Story, Meta } from '@storybook/react';
import { object, string } from 'zod';
import { Form, FormProps, useZodForm } from './form';

export default {
  component: Form,
  title: 'Form',
} as Meta;

export const Primary: Story<FormProps> = () => {
  const loginSchema = object({
    email: string().email({ message: '- Invalid email' }),
    password: string().min(6, { message: '- Invalid password' }),
  });

  const form = useZodForm({
    schema: loginSchema,
  });

  return (
    <Form
      className="flex flex-col w-full"
      form={form}
      onSubmit={() => {}}
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
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
