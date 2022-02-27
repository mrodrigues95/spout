import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ClassroomContentCard } from '../ClassroomCard';

const Upcoming = () => {
  return (
    <ClassroomContentCard
      title="Upcoming"
      icon={<FontAwesomeIcon icon={faCalendarAlt} className="text-amber-900" />}
      description="You have an upcoming assignment due at 5:00pm"
      className="w-full"
    />
  );
};

export default Upcoming;
