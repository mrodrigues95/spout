import { forwardRef } from 'react';
import { Listbox } from '@headlessui/react';
import { Button, ButtonOrLinkProps } from '../button';

export const SelectButton = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(({ ...props }, ref) => {
  return <Listbox.Button as={Button} ref={ref} {...props} />;
});
