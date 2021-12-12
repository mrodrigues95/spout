import { Button } from '@spout/toolkit';
import { Avatar } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { DiscussionInfo_Discussion } from '../__generated__/Discussion.generated';

interface Props {
  users: DiscussionInfo_Discussion['classroom']['users'];
}

const Participants = ({ users }: Props) => {
  return (
    <div className="absolute inset-0 overflow-auto">
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id}>
            <Button className="space-x-3" variant="ghost" size="sm" fullWidth>
              <Avatar src={getRandomAvatar()} aria-hidden="true" size="sm" />
              <span className="flex-1 truncate min-w-0">{user.name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
