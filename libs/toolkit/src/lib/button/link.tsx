import { forwardRef } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './buttonOrLink';

export interface LinkProps extends Omit<ButtonOrLinkProps, 'href'> {
  href: string;
}

export const Link = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  LinkProps
>(({ href, ...props }, ref) => {
  return <ButtonOrLink ref={ref} href={href} {...props} />;
});
