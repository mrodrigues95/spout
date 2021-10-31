import { forwardRef } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './buttonOrLink';

interface Props extends Omit<ButtonOrLinkProps, 'href'> {
  href: string;
}

export const Link = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  ({ href, ...props }, ref) => {
    return <ButtonOrLink ref={ref} href={href} {...props} />;
  },
);
