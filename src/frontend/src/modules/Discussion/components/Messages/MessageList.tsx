import React, { useMemo, useCallback, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import MessageDivider from './MessageDivider';
import Message from './Message';
import { generateItems, Day } from '../../utils/format';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { InfiniteListProps } from '~/shared/components';
import { OptimisticMessage as OptimisticMessageType } from './../../utils/messagesStore';
import OptimisticMessage from './OptimisticMessage';

interface MessageType {
  node: OptimisticMessageType | Message_Message;
}

interface Props {
  discussionId: string;
  messages: MessageType[];
  opts: Omit<InfiniteListProps, 'container' | 'children'>;
}

const isOptimistic = (message: OptimisticMessageType | Message_Message) =>
  'optimisticId' in message && message.optimisticId < 0;

const isDay = (item: OptimisticMessageType | Message_Message | Day) =>
  'type' in item && item.type === 'day';

const START_INDEX = 0;
const PAGE_SIZE = 50;

const MessageList = ({ discussionId, messages, opts }: Props) => {
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX); //  Total of items to be loaded - the one we have already loaded.

  const groupedItems = useMemo(
    () => generateItems(messages.map((edge) => edge.node)),
    [messages]
  );

  console.log('Sorted days: ', groupedItems);

  const prependItems = useCallback(() => {
    const messagesToPrepend = 50;
    const nextFirstItemIndex = firstItemIndex - messagesToPrepend;

    // Should check for `hasNext` here before fetching.
    setTimeout(() => {
      setFirstItemIndex(nextFirstItemIndex);
      opts.next();
    }, 500);

    return false;
  }, [firstItemIndex, opts]);

  if (!groupedItems.length) return null;

  return (
    <>
      <Virtuoso
        className="h-full px-4 py-2 overflow-x-hidden"
        data={groupedItems}
        firstItemIndex={firstItemIndex}
        initialTopMostItemIndex={PAGE_SIZE - 1}
        startReached={prependItems}
        itemContent={(_, item) => {
          if (isDay(item)) {
            return <MessageDivider date={(item as Day).date} />;
          }

          const message = item as OptimisticMessageType | Message_Message;

          return isOptimistic(message) ? (
            <OptimisticMessage
              key={(message as OptimisticMessageType).optimisticId}
              discussionId={discussionId}
              message={message as OptimisticMessageType}
            />
          ) : (
            <Message message={message as Message_Message} />
          );
        }}
        components={{
          Header: () => {
            return (
              <div
                style={{
                  padding: '2rem',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Loading...
              </div>
            );
          },
        }}
      />
    </>
  );
};

export default MessageList;
