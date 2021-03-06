import { createContext, ReactNode, useContext, useMemo } from 'react';
import { RemindersFilterOption } from './RemindersFilterSelect';
import { RemindersSortOption } from './RemindersSortSelect';

interface TRemindersContext {
  sortBy: RemindersSortOption;
  setSortBy(value: RemindersSortOption): void;
  filters: RemindersFilterOption[];
  setFilters(value: RemindersFilterOption[]): void;
  shouldRefetch: boolean;
  setShouldRefetch(value: boolean): void;
}

const RemindersContext = createContext<TRemindersContext | null>(null);

interface Props extends TRemindersContext {
  children: ReactNode;
}

export const RemindersProvider = ({
  sortBy,
  setSortBy,
  filters,
  setFilters,
  shouldRefetch,
  setShouldRefetch,
  children,
}: Props) => {
  const context = useMemo(
    () => ({
      sortBy,
      setSortBy,
      filters,
      setFilters,
      shouldRefetch,
      setShouldRefetch,
    }),
    [sortBy, setSortBy, filters, setFilters, shouldRefetch, setShouldRefetch],
  );

  return (
    <RemindersContext.Provider value={context}>
      {children}
    </RemindersContext.Provider>
  );
};

export const useReminders = () => useContext(RemindersContext);
