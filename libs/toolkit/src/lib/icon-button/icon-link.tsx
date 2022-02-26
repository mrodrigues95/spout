import { forwardRef, ReactElement } from 'react';
import { Link, LinkProps } from '../button';

export interface IconLinkProps
  extends Omit<
    LinkProps,
    | 'fullWidth'
    | 'leftIcon'
    | 'rightIcon'
    | 'loading'
    | 'loadingText'
    | 'spinner'
    | 'isIconButton'
  > {
  icon: ReactElement;
  'aria-label': string;
}

export const IconLink = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  IconLinkProps
>(({ href, icon, 'aria-label': ariaLabel, ...props }, ref) => {
  return (
    <Link ref={ref} aria-label={ariaLabel} href={href} isIconButton {...props}>
      {icon}
    </Link>
  );
});
