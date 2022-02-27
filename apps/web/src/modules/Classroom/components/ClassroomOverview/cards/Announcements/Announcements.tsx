import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons';
import { ClassroomContentCard } from '../ClassroomCard';

const Announcements = () => {
  return (
    <ClassroomContentCard
      title="Announcements"
      icon={<FontAwesomeIcon icon={faBullhorn} className="text-red-600" />}
      description="TODO"
    />
  );
};

export default Announcements;
