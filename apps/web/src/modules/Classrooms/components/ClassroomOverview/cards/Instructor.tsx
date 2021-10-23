import { Props as OverviewProps } from '..';
import { ClassroomContentCard } from './ClassroomCard';

interface Props extends Pick<OverviewProps, 'classroom'> {}

const Instructor = ({ classroom }: Props) => {
  return (
    <ClassroomContentCard
      title="😀 Instructor"
      description={`John Doe is your instructor for ${classroom.name}`}
    />
  );
};

export default Instructor;
