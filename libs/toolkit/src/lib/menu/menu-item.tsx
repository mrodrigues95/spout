import { Menu as HeadlessMenu } from '@headlessui/react';
import clsx from 'clsx';
import { ButtonOrLink, ButtonOrLinkProps } from '../button';

export interface MenuItemProps extends ButtonOrLinkProps {}

export const MenuItem = ({ href, className, ...props }: MenuItemProps) => {
  const isLink = typeof href !== 'undefined';

  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <ButtonOrLink
          variant="tertiary"
          size="sm"
          className={clsx(
            'justify-start',
            active ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-500',
          )}
          fullWidth
          href={href}
          type={isLink ? undefined : 'button'}
          {...props}
        />
      )}
    </HeadlessMenu.Item>
  );
};
