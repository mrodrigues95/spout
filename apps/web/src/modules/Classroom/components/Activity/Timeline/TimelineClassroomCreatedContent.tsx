import { useActivityListItem } from '../ActivityListItemProvider';
import {
  TimelineHeader,
  TimelineHeaderDate,
  TimelineHeaderText,
} from './TimelineHeader';

const TimelineClassroomCreatedContent = () => {
  const { item } = useActivityListItem()!;

  if (item.event !== 'CLASSROOM_CREATED') {
    return null;
  }

  return (
    <TimelineHeader>
      <TimelineHeaderText variant="primary">
        {item.triggeredBy.name}{' '}
      </TimelineHeaderText>
      <TimelineHeaderText variant="secondary">created </TimelineHeaderText>
      <TimelineHeaderText variant="primary">
        {item.classroom.name}
      </TimelineHeaderText>
      <TimelineHeaderDate />
    </TimelineHeader>
  );
};

export default TimelineClassroomCreatedContent;
