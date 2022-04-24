import { forwardRef, useMemo } from 'react';
import { Components, GroupedVirtuoso } from 'react-virtuoso';
import { graphql, usePaginationFragment } from 'react-relay';
import { format, isToday, isTomorrow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@spout/toolkit';
import { useConnection } from '../.././../../shared/hooks';
import { EmptyFallback } from '../../../../shared/components';
import Reminder from './Reminder';
import {
  RemindersList_classroom$data,
  RemindersList_classroom$key,
} from './__generated__/RemindersList_classroom.graphql';

export type ClassroomReminder = NonNullable<
  NonNullable<RemindersList_classroom$data['reminders']>['edges']
>[number]['node'];

type GroupedClassroomReminders = {
  [index: string]: ClassroomReminder[];
};

const groupReminders = (
  nodes: ClassroomReminder[],
  groupByKey: keyof ClassroomReminder,
) =>
  nodes.reduce((group: GroupedClassroomReminders, node) => {
    const key = node[groupByKey]!;
    const dateKey = new Date(key);
    const dateKeyFormatted = isToday(dateKey)
      ? 'Today'
      : isTomorrow(dateKey)
      ? 'Tomorrow'
      : format(new Date(dateKey), 'EEEE, MMMM do');

    return {
      ...group,
      [dateKeyFormatted]: [...(group[dateKeyFormatted] || []), node],
    };
  }, {} as GroupedClassroomReminders);

const computeVirtuosoGroups = (reminders: ClassroomReminder[]) => {
  const groups = groupReminders(reminders, 'dueAt');
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
  @argumentDefinitions(count: { type: "Int!" }, cursor: { type: "String" })
  @refetchable(queryName: "RemindersListPaginationQuery") {
    reminders(first: $count, after: $cursor, order: { dueAt: ASC })
      @connection(key: "RemindersList_reminders") {
      edges {
        node {
          title
          description
          importance
          dueAt
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
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    fragment,
    props.classroom,
  );

  const reminders = useConnection(data.reminders);
  const { groupKeys, groupCounts } = useMemo(
    () => computeVirtuosoGroups(reminders),
    [reminders],
  );

  return (
    <div className="rounded-lg p-2 shadow-sm ring-2 ring-gray-900/5">
      <GroupedVirtuoso
        useWindowScroll
        endReached={hasNext ? () => loadNext(50) : undefined}
        groupCounts={groupCounts}
        groupContent={(index) => {
          return (
            <div className="font-semibold leading-5">{groupKeys[index]}</div>
          );
        }}
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
              className="rounded-lg bg-gray-100 p-2"
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
    </div>
  );
};

export default RemindersList;
