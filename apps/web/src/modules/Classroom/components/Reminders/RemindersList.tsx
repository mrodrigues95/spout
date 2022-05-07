import { forwardRef, useEffect, useMemo } from 'react';
import { Components, GroupedVirtuoso } from 'react-virtuoso';
import { graphql, usePaginationFragment } from 'react-relay';
import { format, isToday, isTomorrow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@spout/toolkit';
import { useConnection } from '../.././../../shared/hooks';
import { EmptyFallback } from '../../../../shared/components';
import Reminder from './Reminder';
import { RemindersSortOption } from './RemindersSortSelect';
import {
  RemindersList_classroom$data,
  RemindersList_classroom$key,
} from './__generated__/RemindersList_classroom.graphql';
import { useReminders } from './RemindersProvider';
import { formatFilterInput, formatOrderInput } from './Reminders';

type ClassroomReminder = NonNullable<
  NonNullable<RemindersList_classroom$data['reminders']>['edges']
>[number]['node'];

type GroupedClassroomReminders = {
  [index: string]: ClassroomReminder[];
};

const groupReminders = (
  nodes: ClassroomReminder[],
  groupByKey: RemindersSortOption['identifierKey'],
) =>
  nodes.reduce((group: GroupedClassroomReminders, node) => {
    if (groupByKey === 'dueAt') {
      const dateKey = new Date(node[groupByKey]!);
      const dateKeyFormatted = isToday(dateKey)
        ? 'Today'
        : isTomorrow(dateKey)
        ? 'Tomorrow'
        : format(new Date(dateKey), 'EEEE, MMMM do');

      return {
        ...group,
        [dateKeyFormatted]: [...(group[dateKeyFormatted] || []), node],
      };
    } else {
      const importanceKey = node[groupByKey]!;
      const importanceKeyFormatted =
        importanceKey === 'HIGH'
          ? 'High'
          : importanceKey === 'MEDIUM'
          ? 'Medium'
          : 'Low';

      return {
        ...group,
        [importanceKeyFormatted]: [
          ...(group[importanceKeyFormatted] || []),
          node,
        ],
      };
    }
  }, {} as GroupedClassroomReminders);

const computeVirtuosoGroups = (
  reminders: ClassroomReminder[],
  groupByKey: RemindersSortOption['identifierKey'],
) => {
  const groups = groupReminders(reminders, groupByKey);
  const groupKeys = Object.keys(groups);
  const groupCounts = Object.values(groups).map(
    (reminders) => reminders.length,
  );

  return { groups, groupKeys, groupCounts };
};

// TODO: Remove grouping on the front-end once Hot Chocolate
// implements data aggregation.
const fragment = graphql`
  fragment RemindersList_classroom on Classroom
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "String" }
    where: { type: "ClassroomReminderFilterInput" }
    order: { type: "[ClassroomReminderSortInput!]" }
  )
  @refetchable(queryName: "RemindersListPaginationQuery") {
    reminders(first: $count, after: $cursor, where: $where, order: $order)
      @connection(key: "RemindersList_reminders") {
      edges {
        node {
          importance
          dueAt
          ...Reminder_classroomReminder
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface RemindersListProps {
  classroom: RemindersList_classroom$key;
}

const RemindersList = ({ ...props }: RemindersListProps) => {
  const { data, loadNext, hasNext, isLoadingNext, refetch } =
    usePaginationFragment(fragment, props.classroom);

  const { sortBy, filters, shouldRefetch, setShouldRefetch } = useReminders()!;

  const reminders = useConnection(data.reminders);
  const { groupKeys, groupCounts } = useMemo(
    () => computeVirtuosoGroups(reminders, sortBy.identifierKey),
    [reminders, sortBy],
  );

  useEffect(() => {
    if (shouldRefetch) {
      refetch(
        {
          first: 50,
          where: formatFilterInput(filters),
          order: formatOrderInput(sortBy),
        },
        { fetchPolicy: 'network-only' },
      );
      setShouldRefetch(false);
    }
  }, [refetch, setShouldRefetch, filters, sortBy, shouldRefetch]);

  return (
    <GroupedVirtuoso
      useWindowScroll
      endReached={hasNext ? () => loadNext(50) : undefined}
      groupCounts={groupCounts}
      groupContent={(index) => (
        <div className="font-semibold leading-5">{groupKeys[index]}</div>
      )}
      itemContent={(index) => <Reminder reminder={reminders[index]} />}
      components={{
        Footer: () =>
          isLoadingNext ? (
            <Spinner
              className="py-4"
              variant="circle"
              size="sm"
              scheme="black"
              center
            />
          ) : null,
        Group: ({ children, ...props }) => (
          <li
            {...props}
            role="listitem"
            className="z-20 rounded-lg bg-gray-100 p-2"
          >
            {children}
          </li>
        ),
        Item: ({ children, ...props }) => (
          <li
            {...props}
            role="listitem"
            className="relative ml-2 border-l-2 border-gray-200 py-1.5 pl-4"
          >
            {/* <span className="absolute bottom-0 -left-[0.5rem] h-[2.05rem] w-2 bg-red-200 z-10 rounded-t-full"></span> */}
            {children}
          </li>
        ),
        EmptyPlaceholder: () => (
          <EmptyFallback
            icon={<FontAwesomeIcon icon={faHandSparkles} size="2x" />}
            className="!mt-12"
          />
        ),
        List: forwardRef(function List(props, ref) {
          return (
            <ol
              {...props}
              // @ts-ignore: `Virtuoso/List` interface is not polymorphic and expects a `div`.
              ref={ref}
              role="list"
            />
          );
        }) as Components['List'],
      }}
    />
  );
};

export default RemindersList;
