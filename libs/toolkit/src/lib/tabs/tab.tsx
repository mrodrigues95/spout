import { useContext } from 'react';
import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';
import { TabContext } from './tab-provider';
import { VARIANTS } from './tabs';
import { ButtonOrLink, ButtonOrLinkProps } from '../button';

type TabProps = ButtonOrLinkProps;

export const Tab = ({ className, children, href, ...props }: TabProps) => {
  const { variant } = useContext(TabContext)!;
  const isLink = typeof href !== 'undefined';

  return (
    <HeadlessTab
      as={ButtonOrLink}
      className={({ selected }) =>
        clsx(
          VARIANTS[variant].tab.base,
          selected
            ? VARIANTS[variant].tab.active
            : VARIANTS[variant].tab.inactive,
          className,
        )
      }
      type={isLink ? undefined : 'button'}
      variant="unstyled"
      href={href}
      {...props}
    >
      {children}
    </HeadlessTab>
  );
};
