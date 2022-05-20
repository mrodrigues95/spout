import { useActivityListItem } from '../ActivityListItemProvider';
import {
  TimelineHeader,
  TimelineHeaderDate,
  TimelineHeaderText,
} from './TimelineHeader';

const TimelineUserJoinedClassroomContent = () => {
  const { item } = useActivityListItem()!;

  if (item.event !== 'USER_JOINED_CLASSROOM') {
    return null;
  }

  return (
    <TimelineHeader>
      <TimelineHeaderText variant="primary">
        {item.triggeredBy.name}{' '}
      </TimelineHeaderText>
      <TimelineHeaderText variant="secondary">has joined </TimelineHeaderText>
      <TimelineHeaderText variant="primary">
        {item.classroom.name}
      </TimelineHeaderText>
      <TimelineHeaderDate />
    </TimelineHeader>
  );
};

export default TimelineUserJoinedClassroomContent;
