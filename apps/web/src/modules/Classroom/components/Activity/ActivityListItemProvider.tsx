import { createContext, ReactNode, useContext, useMemo } from 'react';
import { ActivityListItem_classroomTimelineEvent$data } from './__generated__/ActivityListItem_classroomTimelineEvent.graphql';

type TActivityListItem =
  NonNullable<ActivityListItem_classroomTimelineEvent$data>;

interface TActivityListItemContext {
  item: TActivityListItem;
}

const ActivityListItemContext = createContext<TActivityListItemContext | null>(
  null,
);

interface Props extends TActivityListItemContext {
  children: ReactNode;
}

export const ActivityListItemProvider = ({ item, children }: Props) => {
  const context = useMemo(() => ({ item }), [item]);

  return (
    <ActivityListItemContext.Provider value={context}>
      {children}
    </ActivityListItemContext.Provider>
  );
};

export const useActivityListItem = () => useContext(ActivityListItemContext);
