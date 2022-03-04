import { ReactNode } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';

interface MenuItemRenderProps {
  active: boolean;
  disabled: boolean;
}

export interface MenuItemProps {
  children({ active, disabled }: MenuItemRenderProps): ReactNode;
}

export const MenuItem = ({ children }: MenuItemProps) => {
  return (
    <HeadlessMenu.Item>
      {({ active, disabled }) => children({ active, disabled })}
    </HeadlessMenu.Item>
  );
};
