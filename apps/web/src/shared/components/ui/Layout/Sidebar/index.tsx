import { Fragment, Suspense, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faCog,
  faCommentDots,
  faExclamationCircle,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';
import { IconButton } from '@spout/toolkit';
import { getRandomAvatar } from '../../../../utils';
import { ErrorFallback } from '../../../../../shared/components';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../hooks';
import Image from '../../Image';
import VerticalNav from '../../VerticalNav';
import Search from '../../Search';
import ErrorBoundary from '../../ErrorBoundary';
import CreateClassroom from './CreateClassroom';
import SidebarClassrooms, {
  SidebarClassroomsSkeleton,
} from './SidebarClassrooms';
import UserInfoButton, { UserInfoButtonSkeleton } from './UserInfoButton';
import ThemeButton from './ThemeButton';

const SidebarContent = () => {
  return (
    <>
      <div className="px-2">
        <div className="flex items-center space-x-4">
          <Image src={getRandomAvatar()} alt="Spout" size="sm" rounded />
          <span className="text-lg font-bold">spout</span>
        </div>
        <Search className="mt-8" />
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        <VerticalNav>
          <VerticalNav.Items>
            <VerticalNav.Item
              to="/home"
              label="Home"
              icon={<FontAwesomeIcon icon={faHouseChimney} />}
            />
            <VerticalNav.Item
              to="/messages"
              label="Messages"
              icon={<FontAwesomeIcon icon={faCommentDots} />}
            />
            <VerticalNav.Item
              to="/settings"
              label="Settings"
              icon={<FontAwesomeIcon icon={faCog} />}
            />
            <VerticalNav.Item
              isGroup
              groupTitle="Classrooms"
              groupActions={<CreateClassroom />}
            >
              <ErrorBoundary
                FallbackComponent={({ resetErrorBoundary }) => (
                  <ErrorFallback
                    heading="We couldn't load any classrooms"
                    action={resetErrorBoundary}
                    className="!mt-48"
                  />
                )}
              >
                {({ fetchKey }) => (
                  <Suspense fallback={<SidebarClassroomsSkeleton />}>
                    <SidebarClassrooms fetchKey={fetchKey} />
                  </Suspense>
                )}
              </ErrorBoundary>
            </VerticalNav.Item>
          </VerticalNav.Items>
        </VerticalNav>
      </div>
      <ThemeButton />
      <ErrorBoundary
        FallbackComponent={({ resetErrorBoundary }) => (
          <ErrorFallback
            className="flex-initial"
            icon={
              <FontAwesomeIcon
                icon={faExclamationCircle}
                className="text-red-600"
              />
            }
            heading="There was a problem."
            action={resetErrorBoundary}
          />
        )}
      >
        {({ fetchKey }) => (
          <Suspense fallback={<UserInfoButtonSkeleton />}>
            <UserInfoButton fetchKey={fetchKey} />
          </Suspense>
        )}
      </ErrorBoundary>
    </>
  );
};

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isLaptop = useMediaQuery(MEDIA_QUERIES.LARGE);

  if (isLaptop) return null;

  return (
    <>
      <IconButton
        icon={<FontAwesomeIcon icon={faBars} />}
        aria-label="Navigation"
        size="sm"
        variant="tertiary"
        className="mr-2"
        onClick={() => setIsOpen(true)}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="fixed inset-0 z-50 py-2 backdrop-blur-sm backdrop-filter lg:hidden"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200 transform"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="ease-in duration-150 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex h-full w-80 max-w-[calc(100%-4rem)] flex-col space-y-8 overflow-y-auto rounded-r-3xl bg-white px-1 py-4 shadow-2xl ring ring-gray-200">
              <SidebarContent />
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

const Sidebar = () => {
  return (
    <aside className="relative -ml-2 hidden w-64 flex-shrink-0 flex-col space-y-8 bg-white lg:mr-4 lg:flex xl:mr-8">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
