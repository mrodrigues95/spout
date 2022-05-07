import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Input } from '../input';

export interface DatePickerProps extends ReactDatePickerProps {}

export const DatePicker = ({ ...props }: DatePickerProps) => {
  return (
    <ReactDatePicker
      portalId="date-picker-portal"
      customInput={<Input />}
      popperPlacement="bottom-start"
      popperClassName="z-50"
      popperModifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 5],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            rootBoundary: 'viewport',
            tether: false,
            altAxis: true,
          },
        },
      ]}
      calendarClassName="!rounded-lg !border-0 !ring-1 !ring-gray-900/5 !shadow-md"
      renderCustomHeader={({
        monthDate,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div className="inline-flex w-full items-center justify-between px-3 py-2">
          <button
            type="button"
            aria-label="Previous Month"
            className="h-5 w-5 text-gray-500 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-60"
            disabled={prevMonthButtonDisabled}
            onClick={decreaseMonth}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="flex-1 font-semibold">
            {monthDate.toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
            })}
          </span>
          <button
            type="button"
            aria-label="Next Month"
            className="h-5 w-5 text-gray-500 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-60"
            disabled={nextMonthButtonDisabled}
            onClick={increaseMonth}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
      showPopperArrow={false}
      {...props}
    />
  );
};
