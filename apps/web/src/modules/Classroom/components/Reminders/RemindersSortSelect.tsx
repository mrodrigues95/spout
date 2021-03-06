import { Portal } from '@headlessui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Select, usePopper } from '@spout/toolkit';
import { useReminders } from './RemindersProvider';

interface SortInput {
  key: 'dueAt' | 'importance';
  direction: 'ASC' | 'DESC';
}

export interface RemindersSortOption {
  label: string;
  identifierKey: 'dueAt' | 'importance';
  input: SortInput[];
}

export const SORT_OPTIONS: RemindersSortOption[] = [
  {
    label: 'Due Date',
    identifierKey: 'dueAt',
    input: [{ key: 'dueAt', direction: 'DESC' }],
  },
  {
    label: 'Importance',
    identifierKey: 'importance',
    input: [
      { key: 'importance', direction: 'DESC' },
      { key: 'dueAt', direction: 'DESC' },
    ],
  },
];

const RemindersSortSelect = () => {
  const { sortBy, setSortBy } = useReminders()!;
  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <Select value={sortBy} onChange={setSortBy}>
      <Select.Button ref={trigger} variant="tertiary" size="sm">
        {sortBy.label}
      </Select.Button>
      <Portal>
        <Select.Options ref={container} className="w-48">
          {SORT_OPTIONS.map((option) => (
            <Select.Option
              key={option.identifierKey}
              value={option}
              label={option.label}
              selectedIcon={<FontAwesomeIcon icon={faCheck} size="xs" />}
            />
          ))}
        </Select.Options>
      </Portal>
    </Select>
  );
};

export default RemindersSortSelect;
