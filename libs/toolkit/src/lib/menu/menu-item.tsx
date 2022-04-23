import { Menu as HeadlessMenu } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ButtonOrLink, ButtonOrLinkProps } from '../button';

export interface MenuItemProps extends ButtonOrLinkProps {}

export const MenuItem = ({
  href,
  className,
  variant = 'tertiary',
  ...props
}: MenuItemProps) => {
  const isLink = typeof href !== 'undefined';

  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <ButtonOrLink
          variant={variant}
          size="sm"
          className={twMerge(
            clsx(
              'justify-start',
              variant === 'tertiary' &&
                (active
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white text-gray-500'),
              variant === 'danger' &&
                (active ? 'bg-red-100 text-red-600' : 'bg-white text-red-600'),
              className,
            ),
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
