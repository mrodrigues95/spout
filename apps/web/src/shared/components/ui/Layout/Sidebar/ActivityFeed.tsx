import Avatar from '../../Avatar';
import { getRandomAvatar } from '../../../../utils/getRandomAvatar';

interface Props {
  avatarUrl: string;
  message: string;
}

const ActivityFeedItem = ({ avatarUrl, message }: Props) => {
  return (
    <div className="flex items-center font-medium text-gray-900">
      <Avatar url={avatarUrl} containerClassName="mr-3" rounded />
      {message}
    </div>
  );
};

const ActivityFeed = () => {
  return (
    <div className="space-y-4">
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="uploaded an attachment to C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="joined Introduction to Java."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="left C# fundamentals."
      />
      <ActivityFeedItem
        avatarUrl={getRandomAvatar()}
        message="joined Networking Infrastructure."
      />
    </div>
  );
};

export default ActivityFeed;
