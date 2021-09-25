import { forwardRef } from 'react';
import { ButtonOrLink, ButtonOrLinkProps } from './buttonOrLink';

export const Button = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(({ type = 'button', ...props }, ref) => {
  return <ButtonOrLink ref={ref} type={type} {...props} />;
});
