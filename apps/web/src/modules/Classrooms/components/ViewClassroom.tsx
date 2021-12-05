import { gql, useQuery } from '@apollo/client';
import { Layout, Container } from '../../../shared/components';
import { ClassroomQuery } from './__generated__/ViewClassroom.generated';
import ClassroomOverview from './ClassroomOverview';
import { UserInfoFragment } from '../Discussion/utils/fragments';

const ClassroomFragment = gql`
  fragment Classroom_classroom on Classroom {
    id
    name
    users {
      ...UserInfo_user
    }
    discussions {
      id
      name
    }
  }
  ${UserInfoFragment}
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

  const title = data?.classroomById.name ?? 'Classroom';

  return (
    <Layout title={title}>
      <Container
        title={title}
        isLoading={loading}
        isError={error}
        refetch={refetch}
      >
        {data && <ClassroomOverview classroom={data.classroomById} />}
      </Container>
    </Layout>
  );
};

export default ViewClassroom;
