import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner, Text, Title } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import RemindersList from './RemindersList';
import { RemindersQuery } from './__generated__/RemindersQuery.graphql';

const query = graphql`
  query RemindersQuery($id: ID!, $count: Int!, $cursor: String) {
    classroomById(id: $id) {
      ...RemindersList_classroom @arguments(count: $count, cursor: $cursor)
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Reminders = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<RemindersQuery>(
    query,
    {
      id: router.query.classroomId as string,
      count: 50,
    },
    { fetchKey },
  );

  return (
    <article className="flex h-full flex-col space-y-6">
      <div className="!-mt-1.5 flex items-center justify-between">
        <div>
          <Title as="h2" variant="h4">
            Reminders
          </Title>
          <Text size="sm">Manage your reminders</Text>
        </div>
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<FontAwesomeIcon icon={faPlus} />}
        >
          New
        </Button>
      </div>
      <RemindersList classroom={data.classroomById} />
    </article>
  );
};

const RemindersWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load any reminders for this classroom."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <Reminders fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default RemindersWithSuspense;
