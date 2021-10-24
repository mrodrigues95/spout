import { Classroom_Classroom } from '../__generated__/ViewClassroom.generated';
import {
  Settings,
  Invite,
  Announcements,
  Upcoming,
  Instructor,
  Participants,
} from './cards';
import DiscussionsNavigation from './DiscussionsNavigation';

export interface Props {
  classroom: Classroom_Classroom;
}

const ClassroomOverview = ({ classroom }: Props) => {
  return (
    <>
      <DiscussionsNavigation classroom={classroom} />
      <div className="flex flex-col grid-rows-3 grid-flow-col gap-4 h-full md:grid">
        <Settings />
        <Invite classroom={classroom} />
        <Announcements />
        <Upcoming />
        <Instructor classroom={classroom} />
        <Participants />
      </div>
    </>
  );
};

export default ClassroomOverview;
