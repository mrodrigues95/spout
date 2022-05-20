import { Text } from '@spout/toolkit';
import { useActivityListItem } from '../../ActivityListItemProvider';
import { formatTimelineDate } from '../utils';

const TimelineHeaderDate = () => {
  const { item } = useActivityListItem()!;

  return (
    <>
      <Text as="span" className="mx-1.5" color="muted">
        &bull;
      </Text>
      <Text as="time" color="muted" size="sm" dateTime={item.createdAt}>
        {formatTimelineDate(item.createdAt)}
      </Text>
    </>
  );
};

export default TimelineHeaderDate;
