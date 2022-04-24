import { Disclosure } from '@headlessui/react';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import clsx from 'clsx';
import { Badge, BadgeProps } from '@spout/toolkit';
import { ClassroomReminder } from './RemindersList';

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

interface ReminderProps {
  reminder: ClassroomReminder;
}

const Reminder = ({ reminder }: ReminderProps) => {
  return (
    <div className="group">
      <div className="absolute -left-0.5 top-3.5 z-20 h-4 w-5 rounded-l-lg border-b-2 border-b-gray-200"></div>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button
              className={clsx(
                'relative z-20 flex w-full items-center space-x-6 px-3 py-1',
                'transition-colors duration-150 ease-in-out',
                'focus:outline-none focus-visible:rounded-lg focus-visible:text-sky-900 focus-visible:ring group-hover:bg-sky-100 group-hover:text-sky-900',
                open
                  ? 'rounded-t-lg bg-sky-100 text-sky-900'
                  : 'rounded-lg bg-white text-gray-500',
              )}
            >
              <div className="w-1/6 text-left">
                <p
                  className={clsx(
                    'truncate text-sm font-medium text-gray-900 focus-visible:text-sky-900 group-hover:text-sky-900',
                    open ? 'text-sky-900' : 'text-gray-900',
                  )}
                >
                  {reminder.title}
                </p>
                <p className="truncate text-xs">
                  {format(new Date(reminder.dueAt), 'h:mm a')}
                </p>
              </div>
              <p className="w-full truncate text-left text-sm">
                {reminder.description || <i>No description...</i>}
              </p>
              <div className="flex w-8 shrink-0 items-center justify-center text-center">
                <Badge
                  scheme={
                    IMPORTANCE_MAPPINGS[reminder.importance.toLowerCase()]
                      .scheme
                  }
                  size="xs"
                >
                  {IMPORTANCE_MAPPINGS[reminder.importance.toLowerCase()].text}
                </Badge>
              </div>
              <div className="shrink-0 text-right">
                <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="w-full rounded-b-lg border-x-2 border-b-2 border-sky-100 p-2 text-sm font-medium text-gray-900">
              {reminder.description || <i>No description...</i>}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Reminder;
