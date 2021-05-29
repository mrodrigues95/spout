import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { Link, Button } from '~/shared/components';
import {
  HomeIcon,
  MessagesIcon,
  CalendarIcon,
  ClassroomIcon,
} from '~/shared/assets';
import ProfileInfo from './ProfileInfo';
import ActivityFeed from './ActivityFeed';
import Logout from './Logout';
import ClassroomMenu from '../ClassroomMenu';

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
        'w-full p-3 rounded-3xl text-gray-700 font-medium border-none bg-white lg:mb-8',
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
  isClassroomMenu?: boolean;
  classroomMenuOptions?: ClassroomMenuOptions;
}

const SidebarItem = ({
  icon,
  label,
  href,
  isClassroomMenu = false,
  classroomMenuOptions,
}: SidebarItemProps) => {
  if (isClassroomMenu && !classroomMenuOptions) {
    throw new Error('Bad implementation!');
  }

  const router = useRouter();
  const selected = isClassroomMenu
    ? router.pathname.includes(classroomMenuOptions!.pathname)
    : router.pathname === href;

  const commonProps = {
    active: selected,
    fullWidth: true,
    'aria-labelledby': 'spout-sidebar-item-label',
  };

  const children = (
    <>
      <p className="mr-0 lg:mr-3">{icon}</p>
      <p id="spout-sidebar-item-label" className="hidden lg:inline-flex flex-1">
        {label}
      </p>
    </>
  );

  if (isClassroomMenu) {
    return (
      <ClassroomMenu
        menuButtonProps={{
          ...commonProps,
          children,
        }}
      />
    );
  }

  return (
    <Link href={href} {...commonProps}>
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
        <SidebarContainer className="border lg:p-5">
          <nav className="flex flex-col w-full space-y-3">
            <SidebarItem
              href="/"
              icon={<HomeIcon />}
              label="Home"
            />
            <SidebarItem
              icon={<ClassroomIcon />}
              label="Classrooms"
              isClassroomMenu
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
        <SidebarContainer className="hidden lg:p-5 xl:block">
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
