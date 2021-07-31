import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Virtuoso } from 'react-virtuoso';
import { Skeleton } from '~/shared/components';
import MessageDivider from './MessageDivider';
import Message from './Message';
import { generateItems, Item, Day } from '../../utils/format';
import { DiscussionMessagesQuery } from './__generated__/index.generated';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { OptimisticMessage as OptimisticMessageType } from './../../utils/messagesStore';
import { MeQuery } from './__generated__/MessageComposer.generated';
import OptimisticMessage from './OptimisticMessage';
import { useStore } from '../../utils/messagesStore';
import { UserInfoFragment } from '../../utils/fragments';

const isOptimistic = (message: Item) =>
  'optimisticId' in message && message.optimisticId < 0;

const isDay = (item: Item) => 'type' in item && item.type === 'day';

interface Props {
  discussionId: string;
  messages: { node: OptimisticMessageType | Message_Message }[];
  next(): Promise<DiscussionMessagesQuery | undefined>;
  hasNext: boolean;
}

const MessageList = ({ discussionId, messages, hasNext, next }: Props) => {
  const { data } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `,
    { fetchPolicy: 'cache-only' }
  );

  const [firstItemIndex, setFirstItemIndex] = useState(1000000); //  (total of items to be loaded - the one we have already loaded).
  const [isFetching, setIsFetching] = useState(false);

  const groupedItems = useMemo(
    () => generateItems(messages.map((edge) => edge.node)),
    [messages]
  );

  const prependItems = useCallback(() => {
    setIsFetching(true);

    setTimeout(async () => {
      const items = await next();
      const itemsToPrepend = items?.discussionById.messages?.edges?.length ?? 0;
      setFirstItemIndex(firstItemIndex - itemsToPrepend);
      setIsFetching(false);
    }, 500);

    return false;
  }, [firstItemIndex, next]);

  const optimisticMessages =
    useStore((state) => state.messagesByDiscussionId[discussionId]) ?? [];

  return (
    <Virtuoso
      data={groupedItems}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={messages.length - 1}
      startReached={hasNext ? prependItems : undefined}
      followOutput={(isAtBottom) => {
        const myMessages = optimisticMessages.some(
          (message) => message.createdBy.id === data!.me!.id
        );

        // If the user is scrolled away and sends a message - bring them to the bottom.
        if (myMessages) return 'auto';

        // A message from another user has been received - don't pull to bottom unless already there.
        return isAtBottom ? 'auto' : false;
      }}
      itemContent={(_, item) => {
        if (isDay(item)) {
          return <MessageDivider date={(item as Day).date} />;
        }

        return isOptimistic(item) ? (
          <OptimisticMessage
            key={(item as OptimisticMessageType).optimisticId}
            discussionId={discussionId}
            message={item as OptimisticMessageType}
          />
        ) : (
          <Message
            message={item as Message_Message}
            isLast={groupedItems.slice(-1).pop() === item}
          />
        );
      }}
      components={{
        Header: () =>
          isFetching ? (
            <div className="px-4 py-1">
              <Skeleton h="h-3" />
            </div>
          ) : null,
      }}
    />
  );
};

export default MessageList;
