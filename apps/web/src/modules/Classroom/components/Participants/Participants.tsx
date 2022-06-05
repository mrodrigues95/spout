import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Spinner, Title, Text } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import ParticipantsTable from './ParticipantsTable';
import { ParticipantsQuery } from './__generated__/ParticipantsQuery.graphql';

const query = graphql`
  query ParticipantsQuery($id: ID!) {
    classroomById(id: $id) {
      ...ParticipantsTable_classroom @arguments(classroomId: $id)
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Participants = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ParticipantsQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey, fetchPolicy: 'store-and-network' },
  );

  return (
    <article className="flex h-full flex-col space-y-6">
      <div className="!-mt-1.5 flex flex-col">
        <Title as="h2" variant="h4">
          Participants
        </Title>
        <Text size="sm">View all active participants</Text>
      </div>
      <ParticipantsTable classroom={data.classroomById!} />
    </article>
  );
};

const ParticipantsWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load any participants."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Participants fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default ParticipantsWithSuspense;
