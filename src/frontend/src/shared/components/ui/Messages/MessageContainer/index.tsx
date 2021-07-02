import React, { useMemo, Fragment } from 'react';
import MessageDivider from '../MessageDivider';
import Message from '../Message';
import MessageComposer from '../MessageComposer';
import { DiscussionMessages_Message } from '~/modules/Discussion/components/DiscussionContainer/__generated__/index.generated';
import { groupMessagesByDate } from '../utils/format';

interface Props {
  messages: DiscussionMessages_Message[];
}

const MessageContainer = ({ messages }: Props) => {
  const groupedMessages = useMemo(() => groupMessagesByDate(messages), [
    messages,
  ]);

  return (
    <>
      <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
        <div className="h-full px-4 py-2 overflow-y-auto">
          {groupedMessages &&
            Object.keys(groupedMessages).map((date) => (
              <Fragment key={date}>
                <MessageDivider date={date} />
                {groupedMessages[date].map((message) => (
                  <Message key={message.id} message={message} isLastMessage />
                ))}
              </Fragment>
            ))}
        </div>
        <MessageComposer />
      </div>
    </>
  );
};

export default MessageContainer;
