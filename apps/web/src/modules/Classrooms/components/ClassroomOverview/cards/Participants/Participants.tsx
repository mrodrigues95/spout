import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@spout/toolkit';
import { ClassroomContentCard } from '../ClassroomCard';
import { Classroom_Classroom } from '../../../__generated__/ViewClassroom.generated';

interface Props {
  classroom: Classroom_Classroom;
}

const Participants = ({ classroom }: Props) => {
  return (
    <ClassroomContentCard
      title="Participants"
      icon={<FontAwesomeIcon icon={faUsers} className="text-blue-800" />}
      description="TODO"
    >
      <Button variant="ghost" fullWidth>d</Button>
    </ClassroomContentCard>
  );
};

export default Participants;
