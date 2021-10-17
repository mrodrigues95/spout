import { Props as OverviewProps } from '../';
import { ContentCard } from './cards';

interface Props extends Pick<OverviewProps, 'classroom'> {}

const Instructor = ({ classroom }: Props) => {
  return (
    <ContentCard
    title="😀 Instructor"
    description={`John Doe is your instructor for ${classroom.name}`}
  />
  );
};

export default Instructor;
