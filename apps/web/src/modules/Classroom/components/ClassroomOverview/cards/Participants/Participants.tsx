import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@spout/toolkit';
import { ClassroomContentCard } from '../ClassroomCard';

const Participants = () => {
  return (
    <ClassroomContentCard
      title="Participants"
      icon={<FontAwesomeIcon icon={faUsers} className="text-blue-800" />}
      description="TODO"
    >
      <Button fullWidth>d</Button>
    </ClassroomContentCard>
  );
};

export default Participants;
