import { PlusCircleIcon } from '@spout/assets/icons/outline';
import { Classroom_Classroom } from '../__generated__/ViewClassroom.generated';
import {
  Settings,
  Invite,
  Announcements,
  Upcoming,
  Instructor,
  Participants,
} from './cards';
import { HorizontalNavigation } from '../../../../shared/components';

export interface Props {
  classroom: Classroom_Classroom;
}

const ClassroomOverview = ({ classroom }: Props) => {
  return (
    <>
      <HorizontalNavigation arrows showSeparatorsForIndexes={[0]}>
        <>
          {/* <button
            key="create-discussion-button"
            type="button"
            className="h-full w-10 p-4 bg-indigo-400 text-white rounded-full transition duration-150 ease-in-out hover:rounded-xl"
          >
            <PlusCircleIcon className="w-4 h-4 text-black" />
          </button> */}
          {classroom.discussions.map((discussion) => (
            <button
              key={discussion.id}
              type="button"
              className="p-4 bg-indigo-400 text-white rounded-full transition duration-150 ease-in-out hover:rounded-xl"
            >
              test
            </button>
          ))}
        </>
      </HorizontalNavigation>
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
