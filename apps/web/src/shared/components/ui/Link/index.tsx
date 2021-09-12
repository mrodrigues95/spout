import { forwardRef } from 'react';
import clsx from 'clsx';
import ButtonOrLink, {
  Props as ButtonOrLinkProps,
  classes,
} from '../ButtonOrLink';

// TODO: Just render <Button> here and pass the props.
const Link = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(
  (
    {
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
      return <ButtonOrLink ref={ref} className={className} {...props} />;
    }

    return (
      <ButtonOrLink
        ref={ref}
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

export default Link;
