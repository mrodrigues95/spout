import { Suspense } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faCommentDots,
  faHouseChimney,
} from '@fortawesome/free-solid-svg-icons';
import { getRandomAvatar } from '../../../../utils';
import { ErrorFallback } from '../../../../../shared/components';
import Image from '../../Image';
import VerticalNav from '../../VerticalNav';
import ErrorBoundaryWithRetry from '../../ErrorBoundaryWithRetry';
import CreateClassroom from './CreateClassroom';
import SidebarClassrooms, {
  SidebarClassroomsSkeleton,
} from './SidebarClassrooms';

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-72 flex-col space-y-8 overflow-y-auto p-5">
      <div className="flex items-center space-x-4">
        <Image src={getRandomAvatar()} alt="Spout" rounded />
        <span className="text-lg font-bold">spout</span>
      </div>
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
            <ErrorBoundaryWithRetry
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
            </ErrorBoundaryWithRetry>
          </VerticalNav.Item>
        </VerticalNav.Items>
      </VerticalNav>
    </aside>
  );
};

export default Sidebar;
