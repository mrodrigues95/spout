import { Fragment, Suspense, useCallback, useState } from 'react';
import { FetchPolicy } from 'relay-runtime';
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
import { ErrorFallback } from '../../..';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../hooks';
import Image from '../../Image';
import VerticalNav from '../../VerticalNav';
import Search from '../../Search';
import ErrorBoundary from '../../ErrorBoundary';
import CreateOrJoinClassroom from './CreateOrJoinClassroom';
import SidebarClassrooms, {
  SidebarClassroomsSkeleton,
} from './SidebarClassrooms';
import UserInfoButton, { UserInfoButtonSkeleton } from './UserInfoButton';
import ThemeButton from './ThemeButton';

export interface QueryOptions {
  fetchKey: number;
  fetchPolicy?: FetchPolicy;
}

const SidebarContent = () => {
  const [classroomQueryOptions, setClassroomQueryOptions] =
    useState<QueryOptions>({ fetchKey: 0, fetchPolicy: 'store-or-network' });

  const refreshClassroomsQuery = useCallback(() => {
    setClassroomQueryOptions((prev) => ({
      fetchKey: prev.fetchKey + 1,
      fetchPolicy: 'store-and-network',
    }));
  }, []);

  return (
    <>
      <div className="px-2 xl:pt-2">
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
              groupActions={
                <CreateOrJoinClassroom refreshQuery={refreshClassroomsQuery} />
              }
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
                    <SidebarClassrooms
                      queryOptions={{
                        ...classroomQueryOptions,
                        fetchKey: Math.max(
                          classroomQueryOptions.fetchKey,
                          fetchKey,
                        ),
                      }}
                    />
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
            <Dialog.Panel className="relative flex h-full w-80 max-w-[calc(100%-4rem)] flex-col space-y-8 overflow-y-auto rounded-r-3xl bg-white px-1 py-4 shadow-2xl ring ring-gray-200">
              <SidebarContent />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};

const Sidebar = () => {
  return (
    <aside className="left-[max(0px,calc(50% - 45rem))] fixed inset-y-0 z-20 -ml-2 hidden h-full w-64 shrink-0 flex-col space-y-8 bg-white py-2 lg:flex lg:py-4">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
