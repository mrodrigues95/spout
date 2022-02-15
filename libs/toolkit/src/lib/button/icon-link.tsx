import { forwardRef, ReactElement } from 'react';
import { Link, LinkProps } from './link';

export interface IconLinkProps extends Omit<LinkProps, 'fullWidth'> {
  icon: ReactElement;
  'aria-label': string;
}

export const IconLink = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  IconLinkProps
>(
  (
    {
      href,
      icon,
      'aria-label': ariaLabel,
      size = 'sm',
      variant = 'ghost',
      ...props
    },
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        aria-label={ariaLabel}
        href={href}
        variant={variant}
        size={size}
        isIcon
        {...props}
      >
        {icon}
      </Link>
    );
  },
);
