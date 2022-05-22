import { useEffect, useRef } from 'react';
import { Popover, Portal, Transition } from '@headlessui/react';
import {
  DatePickerState,
  DatePickerStateOptions,
  useDatePickerState,
} from '@react-stately/datepicker';
import { useDatePicker } from '@react-aria/datepicker';
import clsx from 'clsx';
import { FieldButton } from './field-button';
import { DateField } from './date-field';
import { Calendar } from './calendar';
import { usePopper } from '../../hooks';
import { DatePickerLabel } from './date-picker-label';

export interface DatePickerProps
  extends Omit<DatePickerStateOptions, 'errorMessage'> {
  errorMessage?: string;
  handleState?: (state: DatePickerState) => void;
}

export const DatePicker = ({
  handleState,
  errorMessage,
  ...props
}: DatePickerProps) => {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: props.shouldCloseOnSelect || false,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref);

  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 15] } }],
  });

  useEffect(() => {
    handleState?.(state);
  }, [state, handleState]);

  const isInvalid = state.validationState === 'invalid';

  return (
    <div className="relative inline-flex flex-col space-y-1.5 text-left">
      <DatePickerLabel
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        label={props.label}
        {...labelProps}
      />
      <div {...groupProps} ref={ref} className="group">
        <div
          className={clsx(
            'relative flex w-full items-center space-x-4 rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none',
            'transition duration-150 ease-in-out',
            isInvalid
              ? 'group-focus-within:border-red-700 group-focus-within:ring-4 group-focus-within:ring-red-200'
              : 'group-focus-within:border-blue-700 group-focus-within:ring-4 group-focus-within:ring-blue-200',
          )}
        >
          <DateField {...fieldProps} />
          <Popover>
            <Popover.Button
              as={FieldButton}
              isPressed={state.isOpen}
              ref={trigger}
              {...buttonProps}
            />
            <Portal>
              <Transition afterLeave={() => state.setOpen(false)}>
                <Popover.Panel
                  className="relative space-y-2 rounded-lg bg-white p-3 shadow-lg ring-1 ring-gray-900 ring-opacity-5"
                  ref={container}
                >
                  <Calendar {...calendarProps} />
                </Popover.Panel>
              </Transition>
            </Portal>
          </Popover>
        </div>
      </div>
    </div>
  );
};
