import { gql, useQuery } from '@apollo/client';
import { Layout, Container } from '../../../shared/components';
import { ClassroomQuery } from './__generated__/ViewClassroom.generated';
import ClassroomOverview from './ClassroomOverview';

const ClassroomFragment = gql`
  fragment Classroom_classroom on Classroom {
    id
    name
    discussions {
      id
      name
    }
  }
`;

const query = gql`
  query ClassroomQuery($id: ID!) {
    classroomById(id: $id) {
      ...Classroom_classroom
    }
  }
  ${ClassroomFragment}
`;

interface Props {
  classroomId: string;
}

const ViewClassroom = ({ classroomId }: Props) => {
  const { data, loading, error, refetch } = useQuery<ClassroomQuery>(query, {
    variables: { id: classroomId },
  });

  return (
    <Layout title={data?.classroomById.name ?? 'Classroom'}>
      <Container isLoading={loading} isError={error} refetch={refetch}>
        {data && <ClassroomOverview classroom={data.classroomById} />}
      </Container>
    </Layout>
  );
};

export default ViewClassroom;
