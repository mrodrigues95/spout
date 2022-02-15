import { Story, Meta } from '@storybook/react';
import { object, string } from 'zod';
import { Form, FormProps, useZodForm } from './form';

export default {
  component: Form,
  title: 'Form',
} as Meta;

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
  comment: string().min(1, { message: '- Invalid comment' }),
});

export const Primary: Story<FormProps> = () => {
  const form = useZodForm({
    schema: loginSchema,
  });

  return (
    <Form
      className="flex w-full flex-col"
      form={form}
      onSubmit={() => console.log('Submitted!')}
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
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
