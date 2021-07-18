import React, { useMemo, Fragment, useRef, useEffect } from 'react';
import MessageDivider from './MessageDivider';
import Message from './Message';
import { groupMessagesByDate } from '../../utils/format';
import { Message_Message } from './__generated__/index.generated';
import { InfiniteList, InfiniteListProps } from '~/shared/components';
import { OptimisticMessageType } from './../../utils/messagesStore';

interface MessageType {
  node: OptimisticMessageType | Message_Message;
}

interface Props {
  messages: MessageType[];
  opts: Omit<InfiniteListProps, 'container' | 'children'>;
}

const isOptimistic = (message: OptimisticMessageType) =>
  !!(message.optimisticId && message.optimisticId < 0);

const MessageList = ({ messages, opts }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  //   const { shouldScroll, setShouldScroll } = scrollOnNewMessage;

  //   useEffect(() => {
  //     if (shouldScroll && scrollParentRef.current) {
  //       scrollParentRef.current.scrollTop = scrollParentRef.current.scrollHeight;
  //       setShouldScroll(false);
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [messages]);

  const groupedMessages = useMemo(
    () => groupMessagesByDate(messages.map((edge) => edge.node)),
    [messages]
  );

  return (
    <>
      <div ref={containerRef} className="h-full px-4 py-2 overflow-y-auto">
        <InfiniteList container={containerRef} {...opts}>
          {groupedMessages &&
            Object.keys(groupedMessages).map((date) => (
              <Fragment key={date}>
                <MessageDivider date={date} />
                {groupedMessages[date].map((message) => (
                  <Message key={message.id} message={message} />
                ))}
              </Fragment>
            ))}
        </InfiniteList>
      </div>
    </>
  );
};

export default MessageList;
