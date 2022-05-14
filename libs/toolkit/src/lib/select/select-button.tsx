import { forwardRef, ReactElement } from 'react';
import { Listbox } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button, ButtonOrLinkProps } from '../button';

interface SelectButtonProps
  extends Omit<ButtonOrLinkProps, 'rightIcon' | 'leftIcon'> {
  icon?: ReactElement;
}

export const SelectButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  SelectButtonProps
>(
  (
    {
      icon = <FontAwesomeIcon icon={faSort} size="xs" />,
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Listbox.Button
        as={Button}
        className={clsx('justify-start font-medium', className)}
        ref={ref}
        fullWidth={fullWidth}
        {...props}
      >
        {children}
        <span className={clsx('block', fullWidth ? 'ml-auto' : 'ml-3.5')}>
          {icon}
        </span>
      </Listbox.Button>
    );
  },
);
