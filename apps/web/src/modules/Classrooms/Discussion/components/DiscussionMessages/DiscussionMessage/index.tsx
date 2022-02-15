import { memo, useMemo } from 'react';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import { Avatar } from '../../../../../../shared/components';
import { formatMessageDate } from '../../../utils/dates';
import {
  BaseDiscussionMessage,
  DiscussionMessage as TDiscussionMessage,
  RecentMessage,
  RecentMessages,
} from '../../../utils/messages';
import DiscussionMessageActions from './DiscussionMessageActions';
import DiscussionMessageAttachments from './DiscussionMessageAttachments';

interface DiscussionMessageHeaderProps {
  isMyMessage: boolean;
  name: string;
  date: string;
}

const DiscussionMessageHeader = ({
  isMyMessage,
  name,
  date,
}: DiscussionMessageHeaderProps) => {
  return (
    <div
      className={clsx(
        'flex items-center space-x-2',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row',
      )}
    >
      <span className="font-semibold text-gray-900">
        {isMyMessage ? 'You' : name}
      </span>
      <span className="text-xs font-medium text-gray-500">{date}</span>
    </div>
  );
};

const getMessageBorders = (
  {
    isFirstMessage,
    isMiddleMessage,
    isLastMessage,
    isRecent,
  }: Partial<RecentMessage>,
  isMyMessage: boolean,
) => {
  const borders: string[] = [];

  if (!isRecent) {
    borders.push('rounded-2xl');
    return borders;
  }

  if (isMyMessage) {
    borders.push('rounded-l-2xl');
    if (isFirstMessage) borders.push('rounded-tr-2xl', 'rounded-br-md');
    if (isMiddleMessage) borders.push('rounded-r-md');
    if (isLastMessage) borders.push('rounded-br-2xl', 'rounded-tr-md');
  } else {
    borders.push('rounded-r-2xl');
    if (isFirstMessage) borders.push('rounded-tl-2xl', 'rounded-bl-md');
    if (isMiddleMessage) borders.push('rounded-l-md');
    if (isLastMessage) borders.push('rounded-bl-2xl', 'rounded-tl-md');
  }

  return borders;
};

interface DiscussionMessageBodyProps extends Partial<RecentMessage> {
  isMyMessage: boolean;
  optimisticOpts?: OptimisticOptions;
}

const DiscussionMessageBody = ({
  message,
  isMyMessage,
  isRecent,
  isFirstMessage,
  isMiddleMessage,
  isLastMessage,
  optimisticOpts,
}: DiscussionMessageBodyProps) => {
  const messageBorders = useMemo(
    () =>
      getMessageBorders(
        { isRecent, isFirstMessage, isMiddleMessage, isLastMessage },
        isMyMessage,
      ),
    [isRecent, isFirstMessage, isMiddleMessage, isLastMessage, isMyMessage],
  );

  const isOptimistic = !!optimisticOpts;

  return (
    <div
      className={clsx(
        'flex flex-col space-y-4 p-3 text-sm',
        isMyMessage
          ? 'bg-blue-600 shadow-md'
          : 'bg-white shadow-sm ring-1 ring-gray-900/5',
        optimisticOpts?.error ? 'text-red-600' : 'text-black',
        messageBorders.join(' '),
      )}
    >
      <div
        className={clsx(
          'flex',
          isMyMessage ? 'items-end justify-end' : 'items-start justify-start',
        )}
      >
        <p
          className={clsx(
            'whitespace-pre-line break-words text-sm font-medium ',
            isMyMessage ? 'text-white' : 'text-gray-900',
          )}
        >
          {message!.content.trim()}
        </p>
      </div>
      {!isOptimistic && (
        <DiscussionMessageAttachments
          attachments={(message! as BaseDiscussionMessage).attachments}
          isMyMessage={isMyMessage}
        />
      )}
      {optimisticOpts?.error && (
        <Button
          type="button"
          variant="unstyled"
          className="focus:outline-none font-medium"
          onClick={() => optimisticOpts.retry()}
        >
          Failed to send message. Click to try again.
        </Button>
      )}
    </div>
  );
};

const getVerticalMessagePadding = ({
  isFirstMessage,
  isMiddleMessage,
  isLastMessage,
}: Partial<RecentMessage>) => {
  if (isFirstMessage) return 'pt-2 pb-0.5';
  if (isMiddleMessage) return 'py-0.5';
  if (isLastMessage) return 'pb-2 pt-0.5';
  return 'py-2';
};

interface OptimisticOptions {
  loading: boolean;
  retry(): void;
  error?: any;
}

interface Props {
  message: TDiscussionMessage;
  me: { id: string };
  recentMessages?: RecentMessages;
  optimisticOpts?: OptimisticOptions;
}

const DiscussionMessage = ({
  message,
  me,
  recentMessages,
  optimisticOpts,
}: Props) => {
  const isMyMessage = message.createdBy.id === me.id;

  const { isFirstMessage, isMiddleMessage, isLastMessage, isRecent } =
    recentMessages?.[message.id] || {};

  const messagePadding = useMemo(
    () =>
      getVerticalMessagePadding({
        isFirstMessage,
        isMiddleMessage,
        isLastMessage,
      }),
    [isFirstMessage, isMiddleMessage, isLastMessage],
  );

  const formattedDate = useMemo(() => {
    if (isRecent && (isMiddleMessage || isLastMessage)) {
      return formatMessageDate(message.createdAt, 'h:mm a');
    }
    return formatMessageDate(message.createdAt);
  }, [isLastMessage, isMiddleMessage, isRecent, message.createdAt]);

  return (
    <div
      className={clsx(
        'group relative',
        !isRecent && 'py-1',
        isFirstMessage && 'pt-1',
        isLastMessage && 'pb-1',
      )}
    >
      <DiscussionMessageActions
        isMyMessage={isMyMessage}
        isOptimistic={!!optimisticOpts}
      />
      <div
        className={clsx(
          'flex items-center space-x-2 px-4 hover:bg-indigo-100/50',
          isMyMessage
            ? 'flex-row-reverse space-x-reverse'
            : 'flex-row space-x-2',
          optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
          messagePadding,
        )}
      >
        <div className="mb-auto flex w-14 flex-shrink-0 items-center justify-center">
          {!isRecent || isFirstMessage ? (
            <div className="rounded-md shadow-md">
              <Avatar
                src={message.createdBy.avatarUrl}
                name={message.createdBy.name}
                profileColor={message.createdBy.profileColor}
              />
            </div>
          ) : (
            <span className="hidden text-xs font-medium text-gray-500 group-hover:inline-block">
              {formattedDate}
            </span>
          )}
        </div>
        <div
          className={clsx(
            'relative flex max-w-[75%] flex-col space-y-1',
            isMyMessage ? 'items-end' : 'items-start',
          )}
        >
          {(!isRecent || isFirstMessage) && (
            <DiscussionMessageHeader
              isMyMessage={isMyMessage}
              name={message.createdBy.name}
              date={formattedDate}
            />
          )}
          <DiscussionMessageBody
            message={message}
            optimisticOpts={optimisticOpts}
            isMyMessage={isMyMessage}
            isRecent={isRecent}
            isFirstMessage={isFirstMessage}
            isMiddleMessage={isMiddleMessage}
            isLastMessage={isLastMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(DiscussionMessage);
