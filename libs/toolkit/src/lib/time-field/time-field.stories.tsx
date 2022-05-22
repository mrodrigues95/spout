import { Story, Meta } from '@storybook/react';
import { Time } from '@internationalized/date';
import { TimeField, TimeFieldProps } from './time-field';

export default {
  component: TimeField,
  title: 'TimeField',
} as Meta;

const Template: Story<TimeFieldProps> = () => (
  <TimeField label="Appointment time" defaultValue={new Time(9)} />
);

export const Primary = Template.bind({});
Primary.args = {};
