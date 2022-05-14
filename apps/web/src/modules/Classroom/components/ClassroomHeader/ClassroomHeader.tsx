import { graphql, useFragment } from 'react-relay';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Title } from '@spout/toolkit';
import { Header } from '../../../../shared/components';
import { Invite } from './Invite';
import { ClassroomHeader_classroom$key } from './__generated__/ClassroomHeader_classroom.graphql';

const fragment = graphql`
  fragment ClassroomHeader_classroom on Classroom {
    name
  }
`;

interface Props {
  classroom: ClassroomHeader_classroom$key;
}

const ClassroomHeader = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);

  return (
    <div className="flex items-center justify-between">
      <Header>
        <Title as="h1">{classroom.name}</Title>
      </Header>
      <div className="flex items-center space-x-2">
        <IconButton
          icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
          aria-label="Open menu"
          variant="tertiary"
          className="h-8 w-8"
        />
        <Invite />
      </div>
    </div>
  );
};

export default ClassroomHeader;
