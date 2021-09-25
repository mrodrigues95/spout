import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  HomeIcon,
  MessagesIcon,
  CalendarIcon,
  ClassroomIcon,
} from '@spout/shared/assets';
import { Link, ButtonOrLinkProps } from '@spout/toolkit';
import ProfileInfo from './ProfileInfo';
import ActivityFeed from './ActivityFeed';
import Logout from './Logout';
import Menu from './Menu';

const SidebarContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'w-full p-5 rounded-3xl text-gray-700 font-medium border-none bg-white lg:mb-8',
        className
      )}
    >
      {children}
    </div>
  );
};

interface ClassroomMenuOptions {
  pathname: string;
}

interface SidebarItemProps {
  icon: ReactElement;
  label: string;
  href?: string;
  isMenu?: boolean;
  classroomMenuOptions?: ClassroomMenuOptions;
}

const SidebarItem = ({
  icon,
  label,
  href,
  isMenu = false,
  classroomMenuOptions,
}: SidebarItemProps) => {
  if (isMenu && !classroomMenuOptions) {
    throw new Error('Bad implementation!');
  }

  const router = useRouter();
  const selected = isMenu
    ? router.pathname.includes(classroomMenuOptions!.pathname)
    : router.pathname === href;

  const children = (
    <>
      <p className="mr-0 xl:mr-3">{icon}</p>
      <p className="hidden xl:inline-flex flex-1">{label}</p>
    </>
  );

  const commonProps: ButtonOrLinkProps = {
    rounded: 'xl',
    size: 'sm',
    variant: selected ? 'solid' : 'ghost',
    scheme: selected ? 'dark' : 'gray',
  };

  if (isMenu) {
    return (
      <Menu
        menuButtonProps={{
          children,
          ...commonProps,
        }}
      />
    );
  }

  return (
    <Link href={href!} {...commonProps}>
      {children}
    </Link>
  );
};

const Sidebar = () => {
  return (
    <aside className="md:mr-4 lg:mr-0">
      <div
        className="hidden sticky top-0 max-h-screen h-full flex-col sm:py-3 sm:pl-3 md:flex lg:py-10 lg:pl-10"
        style={{ maxWidth: '21.5rem' }}
      >
        <SidebarContainer className="mb-10 px-5 pb-5 pt-2 xl:pt-5">
          <ProfileInfo />
        </SidebarContainer>
        <SidebarContainer className="border lg:p-3">
          <nav className="flex flex-col w-full space-y-3">
            <SidebarItem href="/" icon={<HomeIcon />} label="Home" />
            <SidebarItem
              icon={<ClassroomIcon />}
              label="Classrooms"
              isMenu
              classroomMenuOptions={{
                pathname: '/discussion',
              }}
            />
            <SidebarItem
              href="/messages"
              icon={<MessagesIcon />}
              label="Messages"
            />
            <SidebarItem
              href="/calendar"
              icon={<CalendarIcon />}
              label="Calendar"
            />
          </nav>
        </SidebarContainer>
        <SidebarContainer className="hidden lg:p-3 xl:block">
          <ActivityFeed />
        </SidebarContainer>
        <div className="mt-auto">
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
