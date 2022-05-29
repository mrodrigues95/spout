import { forwardRef } from 'react';
import { Components, Virtuoso } from 'react-virtuoso';
import { graphql, useFragment, usePaginationFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandSparkles } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@spout/toolkit';
import { useConnection } from '../.././../../shared/hooks';
import { EmptyFallback } from '../../../../shared/components';
import Announcement from './Announcement';
import { AnnouncementsList_classroom$key } from './__generated__/AnnouncementsList_classroom.graphql';
import { AnnouncementsList_user$key } from './__generated__/AnnouncementsList_user.graphql';

const announcementsListFragment = graphql`
  fragment AnnouncementsList_classroom on Classroom
  @argumentDefinitions(count: { type: "Int!" }, cursor: { type: "String" })
  @refetchable(queryName: "AnnouncementsListPaginationQuery") {
    announcements(first: $count, after: $cursor, order: { createdAt: DESC })
      @connection(key: "AnnouncementsList_announcements") {
      edges {
        node {
          ...Announcement_classroomAnnouncement
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const meFragment = graphql`
  fragment AnnouncementsList_user on User
  @argumentDefinitions(classroomId: { type: "ID!" }) {
    ...Announcement_user @arguments(classroomId: $classroomId)
  }
`;

interface Props {
  me: AnnouncementsList_user$key;
  classroom: AnnouncementsList_classroom$key;
  isComposingAnnouncement: boolean;
}

const AnnouncementsList = ({ isComposingAnnouncement, ...props }: Props) => {
  const me = useFragment(meFragment, props.me);
  const { data, loadNext, hasNext, isLoadingNext } = usePaginationFragment(
    announcementsListFragment,
    props.classroom,
  );

  const announcements = useConnection(data.announcements);

  return (
    <Virtuoso
      useWindowScroll
      data={announcements}
      endReached={hasNext ? () => loadNext(50) : undefined}
      itemContent={(_, announcement) => (
        <Announcement me={me} classroomAnnouncement={announcement} />
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
          <li {...props} role="listitem" className="py-2">
            {children}
          </li>
        ),
        EmptyPlaceholder: () =>
          isComposingAnnouncement ? null : (
            <EmptyFallback
              icon={<FontAwesomeIcon icon={faHandSparkles} size="2x" />}
              className="!mt-12"
            />
          ),
        List: forwardRef(function List(props, ref) {
          return (
            <ul
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

export default AnnouncementsList;
