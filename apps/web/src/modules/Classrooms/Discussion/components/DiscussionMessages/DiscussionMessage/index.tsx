import { memo, useMemo } from 'react';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import { Avatar } from '../../../../../../shared/components';
import { BaseDiscussionMessage, RecentMessage } from '../../../utils/messages';
import {
  DiscussionMessageProvider,
  Props as DiscussionMessageProviderProps,
  useDiscussionMessage,
} from './DiscussionMessageProvider';
import DiscussionMessageActions from './DiscussionMessageActions';
import DiscussionMessageAttachments from './DiscussionMessageAttachments';
import EditDiscussionMessage from './EditDiscussionMessage';

const DiscussionMessageHeader = () => {
  const {
    message,
    recentMessage,
    formattedCreatedAt,
    isMyMessage,
  } = useDiscussionMessage()!;

  const { isFirstMessage, isRecent } = recentMessage;

  if (isRecent || !isFirstMessage) return null;

  return (
    <div
      className={clsx(
        'flex items-center space-x-2',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      )}
    >
      <span className="font-semibold text-gray-900">
        {isMyMessage ? 'You' : message.createdBy}
      </span>
      <span className="text-xs font-medium text-gray-500">
        {formattedCreatedAt}
      </span>
    </div>
  );
};

const getMessageBorderStyles = (
  {
    isFirstMessage,
    isMiddleMessage,
    isLastMessage,
    isRecent,
  }: Partial<RecentMessage>,
  isMyMessage: boolean
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

const DiscussionMessageBody = () => {
  const {
    message,
    recentMessage,
    isMyMessage,
    isEditing,
    isOptimistic,
    optimisticMessageOpts,
  } = useDiscussionMessage()!;

  const {
    isRecent,
    isFirstMessage,
    isMiddleMessage,
    isLastMessage,
  } = recentMessage;

  const borderStyles = useMemo(
    () =>
      getMessageBorderStyles(
        { isRecent, isFirstMessage, isMiddleMessage, isLastMessage },
        isMyMessage
      ).join(' '),
    [isRecent, isFirstMessage, isMiddleMessage, isLastMessage, isMyMessage]
  );

  return (
    <div
      className={clsx(
        'flex flex-col space-y-4 p-3 text-sm',
        isMyMessage
          ? 'bg-blue-600 shadow-md'
          : 'bg-white shadow-sm ring-1 ring-gray-900/5',
        optimisticMessageOpts?.hasError ? 'text-red-600' : 'text-black',
        borderStyles
      )}
    >
      <div
        className={clsx(
          'flex',
          isMyMessage ? 'items-end justify-end' : 'items-start justify-start'
        )}
      >
        {isEditing ? (
          <EditDiscussionMessage />
        ) : (
          <p
            className={clsx(
              'whitespace-pre-line break-words text-sm font-medium',
              isMyMessage ? 'text-white' : 'text-gray-900'
            )}
          >
            {message.content.trim()}
          </p>
        )}
      </div>
      {!isOptimistic && (
        <DiscussionMessageAttachments
          attachments={(message as BaseDiscussionMessage).attachments}
          isMyMessage={isMyMessage}
        />
      )}
      {optimisticMessageOpts?.hasError && (
        <Button
          type="button"
          variant="unstyled"
          className="focus:outline-none font-medium"
          onClick={() => optimisticMessageOpts.retry()}
        >
          Failed to send message. Click to try again.
        </Button>
      )}
    </div>
  );
};

const getVerticalMessagePaddingStyles = ({
  isFirstMessage,
  isMiddleMessage,
  isLastMessage,
}: Partial<RecentMessage>) => {
  if (isFirstMessage) return 'pt-2 pb-0.5';
  if (isMiddleMessage) return 'py-0.5';
  if (isLastMessage) return 'pb-2 pt-0.5';
  return 'py-2';
};

const DiscussionMessage = () => {
  const {
    message,
    recentMessage,
    formattedCreatedAt,
    isMyMessage,
    optimisticMessageOpts,
  } = useDiscussionMessage()!;

  const {
    isFirstMessage,
    isMiddleMessage,
    isLastMessage,
    isRecent,
  } = recentMessage;

  const paddingStyles = useMemo(
    () =>
      getVerticalMessagePaddingStyles({
        isFirstMessage,
        isMiddleMessage,
        isLastMessage,
      }),
    [isFirstMessage, isMiddleMessage, isLastMessage]
  );

  return (
    <div
      className={clsx(
        !isRecent && 'py-1',
        isFirstMessage && 'pt-1',
        isLastMessage && 'pb-1'
      )}
    >
      <div
        className={clsx(
          'flex relative group items-center space-x-2 px-4 hover:bg-indigo-100/50',
          isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row',
          optimisticMessageOpts?.loading ? 'opacity-50' : 'opacity-100',
          paddingStyles
        )}
      >
        <div>
          <DiscussionMessageActions />
        </div>
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
              {formattedCreatedAt}
            </span>
          )}
        </div>
        <div
          className={clsx(
            'flex max-w-[75%] flex-col space-y-1',
            isMyMessage ? 'items-end' : 'items-start'
          )}
        >
          <DiscussionMessageHeader />
          <DiscussionMessageBody />
        </div>
      </div>
    </div>
  );
};

interface Props
  extends Pick<
    DiscussionMessageProviderProps,
    'message' | 'optimisticMessageOpts' | 'recentMessages'
  > {
  me: { id: string };
}

const DiscussionMessageWithProvider = ({
  message,
  me,
  recentMessages,
  optimisticMessageOpts,
}: Props) => {
  const isMyMessage = useMemo(() => message.createdBy.id === me.id, [
    me.id,
    message.createdBy.id,
  ]);

  return (
    <DiscussionMessageProvider
      message={message}
      optimisticMessageOpts={optimisticMessageOpts}
      isMyMessage={isMyMessage}
      recentMessages={recentMessages}
    >
      <DiscussionMessage />
    </DiscussionMessageProvider>
  );
};

export default memo(DiscussionMessageWithProvider);
