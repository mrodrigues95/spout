import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import {
  today,
  getLocalTimeZone,
  parseAbsoluteToLocal,
} from '@internationalized/date';
import { DatePicker, DatePickerProps } from './date-picker';

export default {
  component: DatePicker,
  title: 'DatePicker',
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Appointment date',
  granularity: 'day',
  minValue: today(getLocalTimeZone()),
  defaultValue: today(getLocalTimeZone()),
};
Primary.parameters = { controls: { include: ['label'] } };

export const WithTime = Template.bind({});
WithTime.args = {
  label: 'Appointment date',
  granularity: 'second',
  defaultValue: parseAbsoluteToLocal(new Date().toISOString()),
};
