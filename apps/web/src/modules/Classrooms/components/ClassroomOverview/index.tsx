// import {
//   Settings,
//   Invite,
//   Announcements,
//   Upcoming,
//   Instructor,
//   Participants,
// } from './cards';
import DiscussionsNavigation from './DiscussionsNavigation';
import ClassroomOverviewProvider from './ClassroomOverviewProvider';

export interface Props {
  classroom: any;
}

const ClassroomOverview = ({ classroom }: Props) => {
  return (
    <ClassroomOverviewProvider>
      <DiscussionsNavigation classroom={classroom} />
      {/* <div className="mt-3 flex space-x-3">
        <div className="flex-1 space-y-3">
          <div className="flex space-x-3">
            <Settings />
            <Invite classroom={classroom} />
          </div>
          <div>
            <Announcements />
          </div>
          <div className="flex space-x-3">
            <Upcoming />
            <Instructor classroom={classroom} />
          </div>
        </div>
        <Participants classroom={classroom} />
      </div> */}
    </ClassroomOverviewProvider>
  );
};

export default ClassroomOverview;
