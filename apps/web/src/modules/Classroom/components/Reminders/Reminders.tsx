import { Suspense, useState } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Spinner, Text, Title } from '@spout/toolkit';
import { ErrorBoundary, ErrorFallback } from '../../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { RemindersProvider } from './RemindersProvider';
import RemindersList from './RemindersList';
import RemindersSortSelect, { SORT_OPTIONS } from './RemindersSortSelect';
import RemindersFilterSelect, { FILTER_OPTIONS } from './RemindersFilterSelect';
import CreateReminder from './CreateReminder';
import ForbiddenOrNotFoundClassroom from '../ForbiddenOrNotFoundClassroom';
import { RemindersQuery } from './__generated__/RemindersQuery.graphql';

const defaultFilters = { dueAt: { gte: new Date().toISOString() } };
export const formatFilterInput = (filters: typeof FILTER_OPTIONS = []) => {
  return filters.length
    ? filters.reduce((acc: object | null, { value: { showPastReminders } }) => {
        return showPastReminders
          ? null
          : { ...acc, dueAt: { gt: new Date().toISOString() } };
      }, null)
    : defaultFilters;
};

export const formatOrderInput = (sortBy = SORT_OPTIONS[0]) =>
  sortBy.input.map((input) => ({ [input.key]: input.direction }));

const query = graphql`
  query RemindersQuery(
    $id: ID!
    $where: ClassroomReminderFilterInput
    $order: [ClassroomReminderSortInput!]
  ) {
    classroomById(id: $id) {
      ...CreateReminder_classroom
      ...RemindersList_classroom @arguments(where: $where, order: $order)
    }
    me {
      isClassroomTeacher(classroomId: $id)
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
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const isTablet = useMediaQuery(MEDIA_QUERIES.SMALL);
  const data = useLazyLoadQuery<RemindersQuery>(
    query,
    {
      id: router.query.classroomId as string,
      where: formatFilterInput(filters),
      order: formatOrderInput(sortBy),
    },
    { fetchKey },
  );

  if (!data.classroomById) {
    return <ForbiddenOrNotFoundClassroom />;
  }

  return (
    <RemindersProvider
      sortBy={sortBy}
      setSortBy={setSortBy}
      filters={filters}
      setFilters={setFilters}
      shouldRefetch={shouldRefetch}
      setShouldRefetch={setShouldRefetch}
    >
      <article className="flex h-full flex-col space-y-2.5">
        <div className="!-mt-1.5 flex items-center justify-between">
          <div>
            <Title as="h2" variant={isTablet ? 'h4' : 'h5'}>
              Reminders
            </Title>
            <Text size="sm">
              {data.me?.isClassroomTeacher
                ? 'Manage your reminders'
                : 'View the latest reminders posted by your instructor'}
            </Text>
          </div>
          {data.me?.isClassroomTeacher && (
            <CreateReminder classroom={data.classroomById} />
          )}
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
