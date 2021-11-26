import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ClassroomContentCard } from '../ClassroomCard';

const Participants = () => {
  return (
    <ClassroomContentCard
      title="Participants"
      icon={<FontAwesomeIcon icon={faUsers} className="text-blue-800" />}
      description="TODO"
    />
  );
};

export default Participants;
