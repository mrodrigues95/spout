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
import Avatar from '../Avatar';

interface TopNavigationItemProps extends ButtonOrLinkProps {
  selected?: boolean;
}

const TopNavigationItem = ({
  selected = false,
  children,
  className,
  ...props
}: TopNavigationItemProps) => {
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
  const router = useRouter();

  const isCurrentRoute = (route: string) =>
    router.pathname.includes(route) || router.asPath.includes(route);

  return (
    <nav aria-labelledby="spout-main-navigation" className="mx-auto">
      <h2 id="spout-main-navigation" className="sr-only">
        Main navigation
      </h2>
      <ul className="inline-flex items-center justify-center px-4 py-2 space-x-3 bg-white rounded-md">
        <TopNavigationItem href="/home" selected={isCurrentRoute('home')}>
          <HomeIcon className="w-5 h-5" />
        </TopNavigationItem>
        <TopNavigationItem href="/messages" selected={isCurrentRoute('messages')}>
          <MessagesIcon className="w-5 h-5" />
        </TopNavigationItem>
        <TopNavigationItem href="/settings" selected={isCurrentRoute('settings')}>
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
