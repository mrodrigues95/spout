import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { DatePicker, DatePickerProps } from './date-picker';

export default {
  component: DatePicker,
  title: 'DatePicker',
} as Meta;

const Template: Story<DatePickerProps> = (args) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      {...args}
      selected={startDate}
      onChange={(date: Date) => setStartDate(date)}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {};
