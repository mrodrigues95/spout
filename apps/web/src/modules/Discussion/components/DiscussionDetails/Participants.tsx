import { graphql, useFragment } from 'react-relay';
import { Button } from '@spout/toolkit';
import { Avatar } from '../../../../shared/components';
import { Participants_classroom$key } from '../../../../__generated__/Participants_classroom.graphql';

const fragment = graphql`
  fragment Participants_classroom on Classroom {
    users {
      id
      avatarUrl
      name
      profileColor
    }
  }
`;

interface Props {
  classroom: Participants_classroom$key;
}

const Participants = ({ classroom }: Props) => {
  const data = useFragment(fragment, classroom);

  return (
    <div className="absolute inset-0 overflow-auto">
      <ul className="space-y-3 p-2">
        {data.users.map((user) => (
          <li key={user.id}>
            <Button
              size="sm"
              variant="tertiary"
              leftIcon={
                <Avatar
                  src={user.avatarUrl}
                  name={user.name}
                  profileColor={user.profileColor}
                  size="sm"
                />
              }
              fullWidth
            >
              <span className="min-w-0 flex-1 truncate">{user.name}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Participants;
