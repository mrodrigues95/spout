import { useActivityListItem } from '../ActivityListItemProvider';
import { logNullEntityError } from './utils';
import {
  TimelineHeader,
  TimelineHeaderDate,
  TimelineHeaderText,
} from './TimelineHeader';
import { Link } from '@spout/toolkit';

const TimelineDiscussionCreatedContent = () => {
  const { item } = useActivityListItem()!;

  if (item.event !== 'DISCUSSION_CREATED') {
    return null;
  }

  if (!item.discussion) {
    logNullEntityError(item.event);
    return null;
  }

  return (
    <TimelineHeader>
      <TimelineHeaderText variant="primary">
        {item.triggeredBy.name}{' '}
      </TimelineHeaderText>
      <TimelineHeaderText variant="secondary">created </TimelineHeaderText>
      <Link
        href={`/classrooms/${item.classroom.id}/discussions/${item.discussion.id}`}
        variant="link"
        className="underline underline-offset-2 hover:decoration-2 focus:decoration-2"
      >
        {item.discussion.name}
      </Link>
      <TimelineHeaderDate />
    </TimelineHeader>
  );
};

export default TimelineDiscussionCreatedContent;
