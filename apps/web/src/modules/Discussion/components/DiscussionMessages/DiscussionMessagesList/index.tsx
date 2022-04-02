/* eslint-disable relay/unused-fields */
import React, { useCallback, useMemo } from 'react';
import { graphql, useFragment, usePaginationFragment } from 'react-relay';
import { Components, ItemContent, Virtuoso } from 'react-virtuoso';
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
import { useConnection } from '../../../../../shared/hooks';
import { useShouldForceScrollToBottom } from '../../../hooks/useShouldForceScrollToBottom';
import { Card } from '../../../../../shared/components';
import {
  useDiscussionMessages,
  useDiscussionMessagesSubscription,
  usePrependDiscussionItems,
} from '../../../hooks';
import DiscussionMessagesListHeader from './DiscussionMessagesListHeader';
import DiscussionMessageDivider from '../DiscussionMessage/DiscussionMessageDivider';
import DiscussionMessage from '../DiscussionMessage';
import DiscussionMessageEvent from '../DiscussionMessage/DiscussionMessageEvent';
import DiscussionOptimisticMessage from '../DiscussionMessage/DiscussionOptimisticMessage';
import { DiscussionMessagesList_user$key } from './__generated__/DiscussionMessagesList_user.graphql';
import { DiscussionMessagesList_discussion$key } from './__generated__/DiscussionMessagesList_discussion.graphql';

const discussionFragment = graphql`
  fragment DiscussionMessagesList_discussion on Discussion
  @argumentDefinitions(count: { type: "Int!" }, cursor: { type: "String" })
  @refetchable(queryName: "DiscussionMessagesListPaginationQuery") {
    id
    ...DiscussionMessagesListHeader_discussion
    messages(last: $count, before: $cursor, order: { createdAt: ASC })
      @connection(key: "DiscussionMessagesList_discussion_messages") {
      edges {
        node {
          id
          content
          createdAt
          isEvent
          messageEvent
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
          pinnedBy {
            id
            name
          }
          parentMessage {
            id
            content
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
  }
`;

const meFragment = graphql`
  fragment DiscussionMessagesList_user on User {
    id
    name
    avatarUrl
    profileColor
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

  const nodes = useConnection(discussion.messages);

  const {
    data: { items, recentMessages },
  } = useDiscussionMessages(discussion.id, nodes);

  const numItemsPrepended = usePrependDiscussionItems(items);

  useDiscussionMessagesSubscription(discussion.id, me.id);

  const startReached = useCallback(() => {
    if (!isLoadingPrevious && hasPrevious) loadPrevious(50);
  }, [hasPrevious, isLoadingPrevious, loadPrevious]);

  const shouldForceScrollToBottom = useShouldForceScrollToBottom(
    discussion.id,
    me.id,
    items,
  );

  const followOutput = useCallback(
    (isAtBottom) => {
      if (shouldForceScrollToBottom()) return isAtBottom ? 'smooth' : 'auto';

      // A message from another user has been received - don't scroll to bottom unless already there.
      return isAtBottom ? 'smooth' : false;
    },
    [shouldForceScrollToBottom],
  );

  const itemContent: ItemContent<Item, unknown> = useCallback(
    (_, item) => {
      return isDivider(item) ? (
        <DiscussionMessageDivider date={(item as Divider).date} />
      ) : isEvent(item) ? (
        // Events are considered as regular messages but styled different.
        <DiscussionMessageEvent message={item as TDiscussionMessage} />
      ) : isOptimistic(item) ? (
        <DiscussionOptimisticMessage
          discussionId={discussion.id}
          recentMessages={recentMessages}
          message={item as TOptimisticDiscussionMessage}
          me={me}
        />
      ) : (
        <DiscussionMessage
          discussionId={discussion.id}
          recentMessages={recentMessages}
          message={item as TDiscussionMessage}
          me={me}
        />
      );
    },
    [discussion.id, me, recentMessages],
  );

  const itemSize = useCallback(
    (el: HTMLElement) => el.getBoundingClientRect().height,
    [],
  );

  const components: Components = useMemo(
    () => ({
      Header: () => (
        <div className="h-42 px-2 py-6 sm:px-4">
          {hasPrevious || isLoadingPrevious ? (
            <Card className="flex w-full space-x-2 rounded-md bg-white p-3 shadow-sm ring-1 ring-gray-900/5">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton.Stack vertical className="flex-1">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-5/6" />
              </Skeleton.Stack>
            </Card>
          ) : (
            <DiscussionMessagesListHeader discussion={discussion} />
          )}
        </div>
      ),
      Footer: () => <div className="pt-2" />,
    }),
    [hasPrevious, isLoadingPrevious, discussion],
  );

  // TODO: Create a 'Jump to Present' footer.
  return (
    <Virtuoso
      data={items}
      totalCount={items.length}
      firstItemIndex={Math.max(0, numItemsPrepended)}
      initialTopMostItemIndex={items.length ? items.length - 1 : 0}
      itemContent={itemContent}
      components={components}
      followOutput={followOutput}
      startReached={startReached}
      increaseViewportBy={{ bottom: 200, top: 0 }}
      itemSize={itemSize}
      overscan={0}
      className="!overflow-x-hidden rounded-xl"
    />
  );
};

export default DiscussionMessagesList;
