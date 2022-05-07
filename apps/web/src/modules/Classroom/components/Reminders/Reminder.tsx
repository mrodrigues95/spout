import { graphql, useFragment } from 'react-relay';
import { Disclosure } from '@headlessui/react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format, isPast } from 'date-fns';
import clsx from 'clsx';
import { Badge, BadgeProps } from '@spout/toolkit';
import { useReminders } from './RemindersProvider';
import { Reminder_classroomReminder$key } from './__generated__/Reminder_classroomReminder.graphql';

const IMPORTANCE_MAPPINGS: Record<
  string,
  { scheme: BadgeProps['scheme']; text: string }
> = {
  low: {
    scheme: 'green',
    text: '!',
  },
  medium: {
    scheme: 'yellow',
    text: '!!',
  },
  high: {
    scheme: 'red',
    text: '!!!',
  },
};

const fragment = graphql`
  fragment Reminder_classroomReminder on ClassroomReminder {
    title
    description
    importance
    dueAt
  }
`;

interface ReminderProps {
  reminder: Reminder_classroomReminder$key;
}

const Reminder = ({ ...props }: ReminderProps) => {
  const reminder = useFragment(fragment, props.reminder);
  const { sortBy } = useReminders()!;

  return (
    <div className="group rounded-lg ring-1 ring-gray-900/5">
      <div className="absolute -left-0.5 top-3.5 h-4 w-5 rounded-l-lg border-b-2 border-b-gray-200"></div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={clsx(
                'relative flex w-full items-center space-x-6 px-3 py-1',
                'transition-colors duration-150 ease-in-out',
                'focus:outline-none focus-visible:rounded-lg focus-visible:text-gray-900 focus-visible:ring group-hover:bg-gray-100 group-hover:text-gray-900',
                open
                  ? 'rounded-t-lg bg-gray-100 text-gray-900'
                  : 'rounded-lg bg-white text-gray-500',
              )}
            >
              <div className="flex-1 text-left">
                <p
                  className={clsx(
                    'truncate text-sm font-medium text-gray-900 focus-visible:text-gray-900 group-hover:text-gray-900',
                    open ? 'text-gray-900' : 'text-gray-900',
                  )}
                >
                  {reminder.title}
                </p>
                <p
                  className={clsx(
                    'truncate text-xs font-medium',
                    isPast(new Date(reminder.dueAt))
                      ? 'text-red-500'
                      : 'text-gray-900',
                  )}
                >
                  {sortBy.identifierKey === 'importance'
                    ? format(new Date(reminder.dueAt), 'yyyy-MM-dd, h:mm a')
                    : format(new Date(reminder.dueAt), 'h:mm a')}
                </p>
              </div>
              <Badge
                scheme={
                  IMPORTANCE_MAPPINGS[reminder.importance.toLowerCase()].scheme
                }
                size="xs"
              >
                {IMPORTANCE_MAPPINGS[reminder.importance.toLowerCase()].text}
              </Badge>
              <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
            </Disclosure.Button>
            <Disclosure.Panel
              as="p"
              className="w-full whitespace-pre-line rounded-b-lg border-x-2 border-b-2 border-gray-100 p-2 text-sm font-medium text-gray-900"
            >
              {reminder.description || <i>No description...</i>}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Reminder;
