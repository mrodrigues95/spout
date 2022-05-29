import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmptyFallback } from '../../../shared/components';

const ForbiddenOrNotFoundClassroom = () => {
  return (
    <EmptyFallback
      heading="Classroom not found"
      body="You do not have access to this classroom or it does not exist."
      icon={<FontAwesomeIcon icon={faComments} size="3x" />}
    />
  );
};

export default ForbiddenOrNotFoundClassroom;
