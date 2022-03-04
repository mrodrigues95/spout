import { forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { Button, ButtonOrLinkProps } from '../button';

export const MenuButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(({ ...props }, ref) => {
  return <HeadlessMenu.Button as={Button} ref={ref} {...props} />;
});
