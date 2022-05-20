import { forwardRef } from 'react';
import { graphql, usePaginationFragment } from 'react-relay';
import { Components, Virtuoso } from 'react-virtuoso';
import { Spinner, Timeline } from '@spout/toolkit';
import { useConnection } from '../../../../shared/hooks';
import ActivityListItem from './ActivityListItem';
import { ActivityList_classroom$key } from './__generated__/ActivityList_classroom.graphql';

const fragment = graphql`
  fragment ActivityList_classroom on Classroom
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "String" }
  )
  @refetchable(queryName: "ActivityListPaginationQuery") {
    timeline(first: $count, after: $cursor, order: { createdAt: DESC })
      @connection(key: "ActivityList_timeline") {
      edges {
        node {
          ...ActivityListItem_classroomTimelineEvent
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

interface Props {
  classroom: ActivityList_classroom$key;
}

const ActivityList = ({ ...props }: Props) => {
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    fragment,
    props.classroom,
  );

  const timeline = useConnection(data.timeline);

  return (
    <Virtuoso
      useWindowScroll
      data={timeline}
      endReached={hasNext ? () => loadNext(50) : undefined}
      itemContent={(index, timelineEvent) => (
        <ActivityListItem
          timelineEvent={timelineEvent}
          isLastItem={timeline.length - 1 === index}
        />
      )}
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
        Item: ({ children, ...props }) => (
          <Timeline.Item {...props} role="listitem">
            {children}
          </Timeline.Item>
        ),
        List: forwardRef(function List(props, ref) {
          return (
            <Timeline
              role="list"
              // @ts-ignore: `Virtuoso/List` interface is not polymorphic and expects a `div`.
              ref={ref}
              {...props}
            />
          );
        }) as Components['List'],
      }}
    />
  );
};

export default ActivityList;
