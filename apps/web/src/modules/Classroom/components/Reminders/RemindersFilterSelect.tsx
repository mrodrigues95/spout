import { Portal } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Select, usePopper } from '@spout/toolkit';
import { useReminders } from './RemindersProvider';

interface FilterValue {
  showPastReminders?: boolean;
}

export interface RemindersFilterOption {
  label: string;
  value: FilterValue;
}

export const FILTER_OPTIONS: RemindersFilterOption[] = [
  {
    label: 'Show past reminders',
    value: { showPastReminders: true },
  },
];

const RemindersFilterSelect = () => {
  const { filters, setFilters } = useReminders()!;
  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <Select value={filters} onChange={setFilters} multiple>
      <Select.Button
        rightIcon={<FontAwesomeIcon icon={faFilter} size="xs" />}
        ref={trigger}
        variant="tertiary"
        size="sm"
      >
        <span className="max-w-[10rem] truncate">
          {filters.length ? (
            filters.map((filter) => filter.label).join(', ')
          ) : (
            <i>None</i>
          )}
        </span>
      </Select.Button>
      <Portal>
        <Select.Options ref={container} className="w-48">
          {FILTER_OPTIONS.map((option) => (
            <Select.Option
              key={option.label}
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

export default RemindersFilterSelect;
