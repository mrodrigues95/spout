import { Avatar, Button } from '@spout/toolkit';
import { ClassroomInfo_Classroom } from '../../../components/__generated__/ViewClassroom.generated';

interface Props {
  users: ClassroomInfo_Classroom['users'];
}

const Participants = ({ users }: Props) => {
  return (
    <div className="absolute inset-0 overflow-auto">
      <ul className="space-y-3">
        {users.map((user) => (
          <li key={user.id}>
            <Button className="space-x-3" variant="ghost" size="sm" fullWidth>
              <Avatar
                src={user.avatarUrl}
                name={user.name}
                size="sm"
              />
              <span className="flex-1 truncate min-w-0">{user.name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
