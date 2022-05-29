import { graphql, useFragment } from 'react-relay';
import { Title } from '@spout/toolkit';
import { Header } from '../../../../shared/components';
import { MenuActions } from './MenuActions';
import { ClassroomHeader_classroom$key } from './__generated__/ClassroomHeader_classroom.graphql';
import { ClassroomHeader_user$key } from './__generated__/ClassroomHeader_user.graphql';

const classroomFragment = graphql`
  fragment ClassroomHeader_classroom on Classroom {
    name
  }
`;

const meFragment = graphql`
  fragment ClassroomHeader_user on User
  @argumentDefinitions(classroomId: { type: "ID!" }) {
    isClassroomTeacher(classroomId: $classroomId)
  }
`;

interface Props {
  classroom: ClassroomHeader_classroom$key;
  me: ClassroomHeader_user$key;
}

const ClassroomHeader = ({ ...props }: Props) => {
  const classroom = useFragment(classroomFragment, props.classroom);
  const me = useFragment(meFragment, props.me);

  return (
    <div className="flex items-center justify-between">
      <Header>
        <Title as="h1">{classroom.name}</Title>
      </Header>
      {me.isClassroomTeacher && (
        <div>
          <MenuActions />
        </div>
      )}
    </div>
  );
};

export default ClassroomHeader;
