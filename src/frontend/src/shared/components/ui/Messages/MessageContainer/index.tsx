import React, { useMemo, Fragment, useRef, useEffect } from 'react';
import MessageDivider from '../MessageDivider';
import Message from '../Message';
import MessageComposer from '../MessageComposer';
import { groupMessagesByDate } from '../utils/format';
import { Message_Message } from '~/modules/Discussion/components/DiscussionContainer/__generated__/index.generated';
import InfiniteList, { Props as InfiniteListProps } from '../../InfiniteList';

interface Props {
  messages: Message_Message[];
  infiniteListOpts: Omit<InfiniteListProps, 'children' | 'scrollParent'>;
}

const MessageContainer = ({ messages, infiniteListOpts }: Props) => {
  const scrollParentRef = useRef<HTMLDivElement>(null);

  const groupedMessages = useMemo(() => groupMessagesByDate(messages), [
    messages,
  ]);

  // TODO: Add loading skeleton for infinite list.
  // TODO: If you hold the scroll bar manually to the top, it will infinitely fetch.
  return (
    <>
      <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
        <div ref={scrollParentRef} className="h-full px-4 py-2 overflow-y-auto">
          <InfiniteList scrollParent={scrollParentRef} {...infiniteListOpts}>
            {groupedMessages &&
              Object.keys(groupedMessages).map((date) => (
                <Fragment key={date}>
                  <MessageDivider date={date} />
                  {groupedMessages[date].map((message) => (
                    <Message key={message.id} message={message} isLastMessage />
                  ))}
                </Fragment>
              ))}
          </InfiniteList>
        </div>
        <MessageComposer />
      </div>
    </>
  );
};

export default MessageContainer;
