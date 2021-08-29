import { forwardRef } from 'react';
import clsx from 'clsx';
import ButtonOrLink, {
  Props as ButtonOrLinkProps,
  classes,
} from '../ButtonOrLink';

const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(
  (
    {
      type = 'button',
      size = 'md',
      rounded = 'md',
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
          classes.base,
          classes.disabled,
          classes.size[size],
          classes.rounded[rounded],
          classes.variant[variant],
          classes.scheme[scheme].inactive,
          active && classes.scheme[scheme].active,
          fullWidth && 'w-full',
          className
        )}
        {...props}
      />
    );
  }
);

export default Button;
