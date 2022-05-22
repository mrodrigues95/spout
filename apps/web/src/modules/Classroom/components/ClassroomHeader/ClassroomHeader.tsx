import { graphql, useFragment } from 'react-relay';
import { Title } from '@spout/toolkit';
import { Header } from '../../../../shared/components';
import { MenuActions } from './MenuActions';
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
      <div>
        <MenuActions />
      </div>
    </div>
  );
};

export default ClassroomHeader;
