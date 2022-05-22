import { forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { Button, ButtonOrLinkProps } from '../button';
import { IconButton, IconButtonProps } from '../icon-button';

export const MenuButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  (ButtonOrLinkProps | IconButtonProps) & {
    as?: typeof Button | typeof IconButton;
  }
>(({ as = Button, ...props }, ref) => {
  return <HeadlessMenu.Button as={as} ref={ref} {...props} />;
});
