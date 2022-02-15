import React, { useCallback, forwardRef } from 'react';
import { graphql, useFragment, usePaginationFragment } from 'react-relay';
import { Components, Virtuoso } from 'react-virtuoso';
import { Skeleton } from '@spout/toolkit';
import {
  Divider,
  isDivider,
  isEvent,
  isOptimistic,
  DiscussionMessage as TDiscussionMessage,
  OptimisticDiscussionMessage as TOptimisticDiscussionMessage,
  Item,
} from '../../../utils/messages';
import { useIsMounted, useConnection } from '../../../../../../shared/hooks';
import {
  useDiscussionMessages,
  useDiscussionMessagesSubscription,
} from '../../../hooks';
import { Card } from '../../../../../../shared/components';
import { DiscussionMessagesList_user$key } from './__generated__/DiscussionMessagesList_user.graphql';
import { DiscussionMessagesList_discussion$key } from './__generated__/DiscussionMessagesList_discussion.graphql';
import DiscussionMessagesListHeader from './DiscussionMessagesListHeader';
import DiscussionMessageDivider from '../DiscussionMessage/DiscussionMessageDivider';
import DiscussionMessage from '../DiscussionMessage';
import DiscussionMessageEvent from '../DiscussionMessage/DiscussionMessageEvent';
import DiscussionOptimisticMessage from '../DiscussionMessage/DiscussionOptimisticMessage';

interface VirtuosoContext {
  hasPrevious: boolean;
  discussion: any;
}

const components: Components<VirtuosoContext> = {
  Header: ({ context: { hasPrevious, discussion } = {} }) =>
    hasPrevious ? (
      <div className="px-4 py-6">
        <Card className="flex w-full space-x-2 rounded-md bg-white p-3 shadow-sm ring-1 ring-gray-900/5">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton.Stack className="flex-1">
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-5/6" />
          </Skeleton.Stack>
        </Card>
      </div>
    ) : (
      <DiscussionMessagesListHeader discussion={discussion} />
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
  }) as Components<VirtuosoContext>['List'],
  Item: ({ children, ...props }) => (
    <li {...props} role="listitem">
      {children}
    </li>
  ),
  Footer: () => <div className="pt-2" />,
};

const discussionFragment = graphql`
  fragment DiscussionMessagesList_discussion on Discussion
    @argumentDefinitions(count: { type: "Int!" }, cursor: { type: "String" })
    @refetchable(queryName: "DiscussionMessagesListPaginationQuery") {
    id
    ...DiscussionMessagesListHeader_discussion
    messages(last: $count, before: $cursor, order: { createdAt: ASC })
      @connection(key: "DiscussionMessagesList_discussion_messages") {
      # eslint-disable-next-line relay/unused-fields
      edges {
        node {
          id
          content
          createdAt
          isDiscussionEvent
          discussionEvent
          attachments {
            id
            location
            name
            contentLength
            extension
          }
          createdBy {
            id
            name
            avatarUrl
            profileColor
          }
        }
      }
    }
  }
`;

const meFragment = graphql`
  fragment DiscussionMessagesList_user on User {
    id
  }
`;

interface Props {
  user: DiscussionMessagesList_user$key;
  discussion: DiscussionMessagesList_discussion$key;
}

const DiscussionMessagesList = ({ ...props }: Props) => {
  const me = useFragment(meFragment, props.user);
  const {
    data: discussion,
    loadPrevious,
    hasPrevious,
    isLoadingPrevious,
  } = usePaginationFragment(discussionFragment, props.discussion);

  const { isMounted } = useIsMounted();
  const nodes = useConnection(discussion.messages);

  const {
    firstItemIndex,
    items,
    recentMessages,
    optimisticMessages,
  } = useDiscussionMessages(discussion.id, nodes);

  useDiscussionMessagesSubscription(discussion.id, me.id);

  const startReached = useCallback(() => {
    if (isMounted.current && hasPrevious && !isLoadingPrevious) {
      loadPrevious(50);
    }
  }, [isMounted, hasPrevious, isLoadingPrevious, loadPrevious]);

  const followOutput = useCallback(
    (isAtBottom) => (optimisticMessages.length || isAtBottom ? 'auto' : false),
    [optimisticMessages.length]
  );

  const itemContent = useCallback(
    (_, item: Item) => {
      return isDivider(item) ? (
        <DiscussionMessageDivider date={(item as Divider).date} />
      ) : isEvent(item) ? (
        // Events are considered as regular messages but styled different.
        <DiscussionMessageEvent event={item as TDiscussionMessage} />
      ) : isOptimistic(item) ? (
        <DiscussionOptimisticMessage
          discussionId={discussion.id}
          recentMessages={recentMessages}
          message={item as TOptimisticDiscussionMessage}
          me={me}
        />
      ) : (
        <DiscussionMessage
          recentMessages={recentMessages}
          message={item as TDiscussionMessage}
          me={me}
        />
      );
    },
    [discussion.id, me, recentMessages]
  );

  // TODO: Create a 'Jump to Present' footer.
  return (
    <Virtuoso
      context={{ hasPrevious, discussion }}
      data={items}
      totalCount={items.length}
      overscan={{ main: 1200, reverse: 1200 }}
      firstItemIndex={Math.max(0, firstItemIndex)}
      initialTopMostItemIndex={items.length - 1}
      startReached={startReached}
      itemContent={itemContent}
      components={components}
      followOutput={followOutput}
    />
  );
};

export default DiscussionMessagesList;
