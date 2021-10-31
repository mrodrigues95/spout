import { ReactElement, ReactNode } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import {
  HomeIcon,
  ChatAlt2Icon,
  CalendarIcon,
  CollectionIcon,
} from '@spout/assets/icons/solid';
import { Link, ButtonOrLinkProps } from '@spout/toolkit';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../hooks';
import ProfileInfo from './ProfileInfo';
import Logout from './Logout';
import Menu from './Menu';

const SidebarContainer = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={clsx('w-full', className)}>{children}</div>;
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
    scheme: 'dark',
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
  const isXL = useMediaQuery(MEDIA_QUERIES.XL);

  return (
    <aside className="hidden md:block md:p-4 xl:py-10 xl:pl-10 xl:pr-0">
      <div
        className="sticky top-0 max-h-screen h-full flex flex-col"
        style={{ maxWidth: isXL ? '14rem' : '4rem' }}
      >
        <div className="space-y-12">
          <SidebarContainer>
            <ProfileInfo />
          </SidebarContainer>
          <SidebarContainer>
            <nav className="flex flex-col w-full space-y-3">
              <SidebarItem
                href="/"
                icon={<HomeIcon className="w-6 h-6" />}
                label="Home"
              />
              <SidebarItem
                icon={<CollectionIcon className="w-6 h-6" />}
                label="Classrooms"
                isMenu
                classroomMenuOptions={{
                  pathname: '/discussion',
                }}
              />
              <SidebarItem
                href="/messages"
                icon={<ChatAlt2Icon className="w-6 h-6" />}
                label="Messages"
              />
              <SidebarItem
                href="/calendar"
                icon={<CalendarIcon className="w-6 h-6" />}
                label="Calendar"
              />
            </nav>
          </SidebarContainer>
        </div>
        <div className="mt-auto">
          <Logout />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
