import { Avatar } from '../../../../../../shared/components';
import { useActivityListItem } from '../../ActivityListItemProvider';

const TimelineHeaderAvatar = () => {
  const { item } = useActivityListItem()!;

  return (
    <Avatar
      src={item.triggeredBy.avatarUrl}
      name={item.triggeredBy.name}
      profileColor={item.triggeredBy.profileColor}
      containerProps={{ className: 'shadow-sm mr-1.5' }}
      size="sm"
    />
  );
};

export default TimelineHeaderAvatar;
