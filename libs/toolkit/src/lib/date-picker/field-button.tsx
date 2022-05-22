import { forwardRef, RefObject } from 'react';
import { useButton } from '@react-aria/button';
import { AriaButtonProps } from '@react-types/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { getButtonStyles } from '../button/buttonOrLink';

const iconButtonStyles = getButtonStyles();

export interface FieldButtonProps extends AriaButtonProps {
  isPressed?: boolean;
}

export const FieldButton = forwardRef<HTMLButtonElement, FieldButtonProps>(
  ({ ...props }, ref) => {
    const { buttonProps, isPressed } = useButton(
      props,
      ref as RefObject<HTMLButtonElement>,
    );

    return (
      <button
        {...buttonProps}
        ref={ref}
        className={twMerge(
          clsx(
            iconButtonStyles.base,
            iconButtonStyles.size.icon.md,
            iconButtonStyles.active,
            iconButtonStyles.variant.default,
            iconButtonStyles.disabled,
            isPressed || props.isPressed ? 'bg-gray-300 text-gray-900' : '',
            'bg-gray-200',
            'hover:bg-gray-300 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0',
          ),
        )}
      >
        <FontAwesomeIcon icon={faCalendar} />
      </button>
    );
  },
);
