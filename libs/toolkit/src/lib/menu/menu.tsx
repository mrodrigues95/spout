import { ComponentProps } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import clsx from 'clsx';
import { MenuButton } from './menu-button';
import { MenuItems } from './menu-items';
import { MenuItem } from './menu-item';
import { MenuGroup } from './menu-group';

export interface MenuProps extends ComponentProps<'div'> {}

export const Menu = ({ className, children, ...props }: MenuProps) => {
  return (
    <HeadlessMenu
      as="div"
      className={clsx('relative inline-block w-full text-left', className)}
      {...props}
    >
      {children}
    </HeadlessMenu>
  );
};

Menu.Items = MenuItems;
Menu.Item = MenuItem;
Menu.Group = MenuGroup;
Menu.Button = MenuButton;
