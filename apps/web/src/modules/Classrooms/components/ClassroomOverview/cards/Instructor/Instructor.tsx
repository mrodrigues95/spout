import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughBeam } from '@fortawesome/free-solid-svg-icons';
import { Props as OverviewProps } from '../../../ClassroomOverview';
import { ClassroomContentCard } from '../ClassroomCard';

interface Props extends Pick<OverviewProps, 'classroom'> {}

const Instructor = ({ classroom }: Props) => {
  return (
    <ClassroomContentCard
      title="Instructor"
      icon={<FontAwesomeIcon icon={faLaughBeam} className="text-yellow-500" />}
      description={`John Doe is your instructor for ${classroom.name}`}
      className="w-full"
    />
  );
};

export default Instructor;
