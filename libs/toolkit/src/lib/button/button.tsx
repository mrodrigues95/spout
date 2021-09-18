import { forwardRef } from 'react';
import clsx from 'clsx';
import { styles, ButtonOrLink, ButtonOrLinkProps } from './buttonOrLink';

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(
  (
    {
      type = 'button',
      size = 'md',
      rounded = 'normal',
      variant = 'solid',
      scheme = 'dark',
      active = true,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    if (variant === 'unstyled') {
      return (
        <ButtonOrLink ref={ref} type={type} className={className} {...props} />
      );
    }

    return (
      <ButtonOrLink
        ref={ref}
        type={type}
        className={clsx(
          styles.base,
          styles.disabled,
          styles.size[size],
          styles.rounded[rounded],
          styles.variant[variant],
          styles.scheme[scheme].inactive,
          active && styles.scheme[scheme].active,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);
