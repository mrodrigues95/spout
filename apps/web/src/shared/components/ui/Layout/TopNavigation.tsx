import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ButtonOrLink, ButtonOrLinkProps } from '@spout/toolkit';
import {
  HomeIcon,
  MessagesIcon,
  SettingsIcon,
} from '@spout/assets/icons/solid';
import { ChevronIcon } from '@spout/assets/icons/outline';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import { useIsCurrentRoute } from '../../../hooks/useIsCurrentRoute';
import Avatar from '../Avatar';

interface TopNavigationItemProps extends ButtonOrLinkProps {}

const TopNavigationItem = ({
  children,
  className,
  ...props
}: TopNavigationItemProps) => {
  const selected = useIsCurrentRoute([props.href || '__']);

  return (
    <li>
      <ButtonOrLink
        variant="ghost"
        scheme={selected ? 'orange' : 'gray'}
        size="sm"
        className={clsx(selected && 'bg-orange-100', className)}
        {...props}
      >
        {children}
      </ButtonOrLink>
    </li>
  );
};

const TopNavigation = () => {
  return (
    <nav
      aria-labelledby="spout-main-navigation"
      className="mx-auto shadow-md rounded-md"
    >
      <h2 id="spout-main-navigation" className="sr-only">
        Main navigation
      </h2>
      <ul className="inline-flex items-center justify-center px-4 py-2 space-x-3 bg-white rounded-md">
        <TopNavigationItem href="/home">
          <HomeIcon className="w-5 h-5" />
        </TopNavigationItem>
        <TopNavigationItem href="/messages">
          <MessagesIcon className="w-5 h-5" />
        </TopNavigationItem>
        <TopNavigationItem href="/settings">
          <SettingsIcon className="w-5 h-5" />
        </TopNavigationItem>
        <hr className="border border-blueGray-300 h-4" />
        <TopNavigationItem type="button" className="space-x-2" scheme="gray">
          <Avatar src={getRandomAvatar()} aria-hidden="true" size="xs" />
          <span className="text-blueGray-900 font-semibold">
            Marcus Rodrigues
          </span>
          <ChevronIcon className="w-4 h-4 transform -rotate-90 text-gray-600" />
        </TopNavigationItem>
      </ul>
    </nav>
  );
};

export default TopNavigation;
