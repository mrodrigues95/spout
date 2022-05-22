import { Story, Meta } from '@storybook/react';
import {
  getLocalTimeZone,
  today,
  CalendarDate,
  parseAbsoluteToLocal,
  Time,
} from '@internationalized/date';
import { any, object, string } from 'zod';
import { Form, FormProps, useZodForm } from './form';

export default {
  component: Form,
  title: 'Form',
} as Meta;

const dobMinValue = today(getLocalTimeZone());
const meetingTimeMinValue = parseAbsoluteToLocal(new Date().toISOString());

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
  comment: string().min(1, { message: '- Invalid comment' }),
  dob: any().refine((dob) => (dob as CalendarDate).compare(dobMinValue) >= 0, {
    message: ' - Invalid date',
    path: ['dob'],
  }),
  meetingTime: any().refine(
    (time) => (time as Time).compare(meetingTimeMinValue) >= 0,
    {
      message: ' - Invalid time (must be in the future)',
      path: ['meetingTime'],
    },
  ),
});

export const Primary: Story<FormProps> = () => {
  const form = useZodForm({
    schema: loginSchema,
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
        label="Date of Birth"
        errorMessage=" - Invalid date"
        minValue={dobMinValue}
        controller={{
          name: 'dob',
          control: form.control,
          defaultValue: dobMinValue,
        }}
      />
      <Form.TimeField
        label="Meeting Time"
        errorMessage=" - Invalid time (must be in the future)"
        minValue={meetingTimeMinValue}
        controller={{
          name: 'meetingTime',
          control: form.control,
          defaultValue: meetingTimeMinValue,
        }}
      />
      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form>
  );
};
