import { useActivityListItem } from '../ActivityListItemProvider';
import {
  TimelineHeader,
  TimelineHeaderDate,
  TimelineHeaderText,
} from './TimelineHeader';

const TimelineReminderCreatedContent = () => {
  const { item } = useActivityListItem()!;

  if (item.event !== 'REMINDER_CREATED') {
    return null;
  }

  return (
    <TimelineHeader>
      <TimelineHeaderText variant="primary">
        {item.triggeredBy.name}{' '}
      </TimelineHeaderText>
      <TimelineHeaderText variant="secondary">
        created a new reminder
      </TimelineHeaderText>
      <TimelineHeaderDate />
    </TimelineHeader>
  );
};

export default TimelineReminderCreatedContent;
