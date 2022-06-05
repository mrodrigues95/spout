import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ButtonOrLink, ButtonOrLinkProps } from '../button/buttonOrLink';

const STYLES = {
  base: 'p-2 bg-indigo-500 text-white inline-flex justify-center w-10 h-10 sm:w-12 sm:h-12 items-center shrink-0 font-semibold rounded-100 select-none transition-all duration-75 ease-in-out',
  active:
    'focus:outline-none focus-visible:ring focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:rounded-2xl hover:rounded-2xl hover:bg-indigo-600 active:bg-indigo-700',
} as const;

export const getHorizontalNavigationItemStyles = () => STYLES;

interface HorizontalNavigationItemProps extends ButtonOrLinkProps {}

export const HorizontalNavigationItem = ({
  href,
  className,
  ...props
}: HorizontalNavigationItemProps) => {
  const isLink = typeof href !== 'undefined';

  return (
    <Tab
      as={ButtonOrLink}
      className={twMerge(clsx(STYLES.base, STYLES.active, className))}
      variant="unstyled"
      type={isLink ? undefined : 'button'}
      href={href}
      {...props}
    />
  );
};
