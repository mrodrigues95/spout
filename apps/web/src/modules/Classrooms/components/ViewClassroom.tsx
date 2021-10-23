import { gql, useQuery } from '@apollo/client';
import { Spinner } from '@spout/toolkit';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { Layout, Container, ErrorFallback } from '../../../shared/components';
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
      {loading && <Spinner size="sm" />}
      {error && (
        <Container>
          <Container.Header />
          <ErrorFallback
            icon={<FeelingBlueIllustration className="w-full h-64" />}
            heading="Sorry, we can't load this classroom right now."
            action={refetch}
          />
        </Container>
      )}
      {data && (
        <Container>
          <Container.Header title={data.classroomById.name} />
          <Container.Body className="!flex-initial p-2 space-y-12 sm:p-0">
            <ClassroomOverview classroom={data.classroomById} />
          </Container.Body>
        </Container>
      )}
    </Layout>
  );
};

export default ViewClassroom;
