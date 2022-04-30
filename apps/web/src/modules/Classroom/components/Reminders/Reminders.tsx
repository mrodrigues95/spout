import { Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Spinner, Text, Title } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import RemindersList from './RemindersList';
import RemindersSortSelect, { SORT_OPTIONS } from './RemindersSortSelect';
import RemindersFilterSelect, { FILTER_OPTIONS } from './RemindersFilterSelect';
import { RemindersQuery } from './__generated__/RemindersQuery.graphql';
import { RemindersProvider } from './RemindersProvider';

const defaultFilters = { dueAt: { gte: new Date().toISOString() } };

const query = graphql`
  query RemindersQuery(
    $id: ID!
    $count: Int!
    $cursor: String
    $where: ClassroomReminderFilterInput
    $order: [ClassroomReminderSortInput!]
  ) {
    classroomById(id: $id) {
      ...RemindersList_classroom
        @arguments(count: $count, cursor: $cursor, where: $where, order: $order)
    }
  }
`;

interface Props {
  fetchKey: number;
}

const Reminders = ({ fetchKey }: Props) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const [filters, setFilters] = useState<typeof FILTER_OPTIONS>([]);
  const data = useLazyLoadQuery<RemindersQuery>(
    query,
    {
      id: router.query.classroomId as string,
      count: 50,
      where: filters.length
        ? filters.reduce(
            (acc: object | null, { value: { showPastReminders } }) => {
              return showPastReminders
                ? null
                : { ...acc, dueAt: { gte: new Date().toISOString() } };
            },
            null,
          )
        : defaultFilters,
      order: sortBy.input.map((input) => ({ [input.key]: input.direction })),
    },
    { fetchKey },
  );

  return (
    <RemindersProvider
      sortBy={sortBy}
      setSortBy={setSortBy}
      filters={filters}
      setFilters={setFilters}
    >
      <article className="flex h-full flex-col space-y-2.5">
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
        <div className="inline-flex items-center justify-end space-x-1.5">
          <RemindersFilterSelect />
          <RemindersSortSelect />
        </div>
        <RemindersList classroom={data.classroomById} />
      </article>
    </RemindersProvider>
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
