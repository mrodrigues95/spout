import clsx from 'clsx';
import { ReactElement } from 'react';
import { Button, ButtonOrLinkProps } from '../button';

// Override `buttonOrLink` styles and use even padding instead.
const STYLES = {
  size: {
    xs: 'p-1 text-xs',
    sm: 'p-2 text-sm',
    md: 'p-3 text-md',
    lg: 'p-6 text-lg',
    xl: 'p-8 text-xl',
  },
};

export interface IconButtonProps extends Omit<ButtonOrLinkProps, 'fullWidth'> {
  icon: ReactElement;
  'aria-label': string;
}

export const IconButton = ({
  icon,
  className,
  'aria-label': ariaLabel,
  size = 'sm',
  variant = 'ghost',
  ...props
}: IconButtonProps) => {
  return (
    <Button
      className={clsx(STYLES.size[size], className)}
      aria-label={ariaLabel}
      variant={variant}
      {...props}
    >
      {icon}
    </Button>
  );
};
