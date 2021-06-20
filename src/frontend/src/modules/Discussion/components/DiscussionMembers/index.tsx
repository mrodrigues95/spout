import { Avatar, Button, Badge, BadgeVariants } from '~/shared/components';
import { DotsVerticalIcon } from '~/shared/assets';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';
import { User } from '~/__generated__/schema.generated';

interface Props {
  users: Partial<User>[];
}

const DiscussionMembers = ({ users }: Props) => {
  return (
    <div className="hidden sm:block">
      <div className="flex items-center">
        <div className="flex items-center -space-x-2">
          <span className="mr-10">
            <Badge variant={BadgeVariants.PINK}>{users.length} Members</Badge>
          </span>
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
          <Avatar url={getRandomAvatar()} />
        </div>
        <Button
          rounded="full"
          className="ml-2 px-2 py-2"
          aria-label="View discussion members"
        >
          <DotsVerticalIcon className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default DiscussionMembers;
