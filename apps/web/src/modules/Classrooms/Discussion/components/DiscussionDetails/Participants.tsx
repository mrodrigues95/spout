import { Button } from '@spout/toolkit';
import { Avatar } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { DiscussionInfo_Discussion } from '../__generated__/Discussion.generated';

interface Props {
  users: DiscussionInfo_Discussion['classroom']['users'];
}

const Participants = ({ users }: Props) => {
  return (
    <div className="flex flex-col p-2 space-y-3 border-2 border-gray-100 rounded-md">
      {users.map((user) => (
        <Button key={user.id} className="space-x-3" variant="ghost" size="sm">
          <Avatar src={getRandomAvatar()} aria-hidden="true" size="sm" />
          <span className="flex-1 truncate min-w-0">{user.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default Participants;
