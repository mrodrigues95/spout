import { useRef } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { getButtonStyles } from '../button';

const iconButtonStyles = getButtonStyles();

interface CalendarButtonProps extends AriaButtonProps {}

export const CalendarButton = ({ ...props }: CalendarButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={twMerge(
        clsx(
          iconButtonStyles.base,
          iconButtonStyles.size.icon.md,
          iconButtonStyles.active,
          iconButtonStyles.variant.tertiary,
          iconButtonStyles.disabled,
          'ring-0',
        ),
      )}
    >
      {props.children}
    </button>
  );
};
