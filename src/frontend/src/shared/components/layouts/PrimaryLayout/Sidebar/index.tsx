import { ReactNode } from 'react';
import clsx from 'clsx';
import { VerticalNav } from '~/shared/components';
import {
  HomeIcon,
  MessagesIcon,
  CalendarIcon,
  ClassroomIcon,
} from '~/shared/assets';
import ProfileInfo from './ProfileInfo';
import ActivityFeed from './ActivityFeed';
import Logout from './Logout';

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
          <VerticalNav>
            <VerticalNav.Item
              href="/"
              icon={<HomeIcon className="mx-auto xl:mr-3 xl:ml-0" />}
              label="Home"
            />
            <VerticalNav.Item
              href="/classrooms"
              icon={<ClassroomIcon className="mx-auto xl:mr-3 xl:ml-0" />}
              label="Classrooms"
            />
            <VerticalNav.Item
              href="/messages"
              icon={<MessagesIcon className="mx-auto xl:mr-3 xl:ml-0" />}
              label="Messages"
            />
            <VerticalNav.Item
              href="/calendar"
              icon={<CalendarIcon className="mx-auto xl:mr-3 xl:ml-0" />}
              label="Calendar"
            />
          </VerticalNav>
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
