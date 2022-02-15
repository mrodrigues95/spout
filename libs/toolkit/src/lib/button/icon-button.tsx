import { forwardRef, ReactElement } from 'react';
import { ButtonOrLinkProps } from './buttonOrLink';
import { Button } from './button';

export interface IconButtonProps extends Omit<ButtonOrLinkProps, 'fullWidth'> {
  icon: ReactElement;
  'aria-label': string;
}

export const IconButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  IconButtonProps
>(
  (
    { icon, 'aria-label': ariaLabel, size = 'sm', variant = 'ghost', ...props },
    ref,
  ) => {
    return (
      <Button
        ref={ref}
        aria-label={ariaLabel}
        variant={variant}
        size={size}
        isIcon
        {...props}
      >
        {icon}
      </Button>
    );
  },
);
