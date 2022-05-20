import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBook,
  faBullhorn,
  faComments,
  faPencil,
  faUserGroup,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Timeline } from '@spout/toolkit';
import { useActivityListItem } from '../ActivityListItemProvider';

const Icon = ({ className, ...props }: FontAwesomeIconProps) => (
  <FontAwesomeIcon className={clsx('h-4 w-4', className)} {...props} />
);

const TimelineDot = () => {
  const {
    item: { event },
  } = useActivityListItem()!;

  return (
    <Timeline.Dot
      className={clsx(event === 'CLASSROOM_CREATED' && 'bg-blue-700')}
    >
      {event === 'USER_JOINED_CLASSROOM' && <Icon icon={faUserPlus} />}
      {event === 'CLASSROOM_CREATED' && (
        <Icon icon={faUserGroup} color="white" />
      )}
      {event === 'DISCUSSION_CREATED' && <Icon icon={faComments} />}
      {event === 'SYLLABUS_CREATED' && <Icon icon={faBook} />}
      {event === 'SYLLABUS_UPDATED' && <Icon icon={faPencil} />}
      {event === 'ANNOUNCEMENT_CREATED' && <Icon icon={faBullhorn} />}
      {event === 'ANNOUNCEMENT_UPDATED' && <Icon icon={faPencil} />}
      {event === 'REMINDER_CREATED' && <Icon icon={faBell} />}
    </Timeline.Dot>
  );
};

export default TimelineDot;
