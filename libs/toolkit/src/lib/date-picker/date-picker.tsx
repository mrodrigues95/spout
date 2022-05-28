import { forwardRef, useEffect, useRef } from 'react';
import { Popover, Portal, Transition } from '@headlessui/react';
import { FocusableRef } from '@react-types/shared';
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
import { useFocusManagerRef, usePopper } from '../../hooks';
import { DatePickerLabel } from './date-picker-label';

export interface DatePickerProps
  extends Omit<DatePickerStateOptions, 'errorMessage'> {
  isFormError?: boolean;
  errorMessage?: string;
  handleState?: (state: DatePickerState) => void;
}
export const DatePicker = forwardRef<
  FocusableRef<HTMLElement>,
  DatePickerProps
>(({ handleState, errorMessage, isFormError, ...props }, ref) => {
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: props.shouldCloseOnSelect || false,
  });

  const targetRef = useRef<HTMLDivElement>(null);
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, targetRef);

  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 15] } }],
  });

  useEffect(() => {
    handleState?.(state);
  }, [state, handleState]);

  const domRef = useFocusManagerRef(ref as FocusableRef<HTMLElement>);

  // Prioritize form errors if defined.
  const isError =
    typeof isFormError !== 'undefined'
      ? isFormError
      : state.validationState === 'invalid';

  return (
    <DatePickerLabel
      {...labelProps}
      ref={domRef}
      isError={isError}
      errorMessage={errorMessage}
      label={props.label}
    >
      <div {...groupProps} ref={targetRef} className="group">
        <div
          className={clsx(
            'relative flex w-full items-center space-x-4 rounded-lg border-2 border-transparent bg-gray-100 px-3 py-2 font-medium outline-none',
            'transition duration-150 ease-in-out',
            isError
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
    </DatePickerLabel>
  );
});
