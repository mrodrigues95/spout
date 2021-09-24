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
          styles.scheme[scheme].default,
          variant === 'ghost' || variant === 'outline'
            ? styles.scheme[scheme].secondary
            : styles.scheme[scheme].primary,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);
