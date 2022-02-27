import { memo, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Button, Text } from '@spout/toolkit';
import { Avatar } from '../../../../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../../../shared/hooks';
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
    data: { message, recentMessage, formattedCreatedAt, isMyMessage },
  } = useDiscussionMessage()!;

  const { isFirstMessage, isRecent } = recentMessage;

  if (isRecent && !isFirstMessage) return null;

  return (
    <div
      className={clsx(
        'flex items-center space-x-2 pb-1',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row',
      )}
    >
      <span className="font-medium text-gray-900">
        {isMyMessage ? 'You' : message.createdBy.name}
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

const DiscussionMessageBody = () => {
  const {
    data: {
      message,
      recentMessage,
      isMyMessage,
      isOptimistic,
      optimisticMessageOpts,
    },
    state: { isEditing },
  } = useDiscussionMessage()!;

  const { isRecent, isFirstMessage, isMiddleMessage, isLastMessage } =
    recentMessage;

  const borderStyles = useMemo(
    () =>
      getMessageBorderStyles(
        { isRecent, isFirstMessage, isMiddleMessage, isLastMessage },
        isMyMessage,
      ).join(' '),
    [isRecent, isFirstMessage, isMiddleMessage, isLastMessage, isMyMessage],
  );

  return (
    <div
      className={clsx(
        'flex flex-col p-3 text-sm',
        isMyMessage
          ? 'bg-blue-600 shadow-md'
          : 'bg-white shadow-sm ring-1 ring-gray-900/5',
        optimisticMessageOpts?.hasError ? 'text-red-600' : 'text-black',
        borderStyles,
      )}
    >
      <div
        className={clsx(
          'flex',
          isMyMessage ? 'items-end justify-end' : 'items-start justify-start',
        )}
      >
        {isEditing ? (
          <EditDiscussionMessage />
        ) : (
          <p
            className={clsx(
              'whitespace-pre-line break-words text-sm',
              isMyMessage ? 'text-white' : 'text-gray-900',
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
          className="focus:outline-none pt-4 font-medium"
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
  const isMobile = useMediaQuery(MEDIA_QUERIES.SMALL);

  const {
    data: {
      message,
      recentMessage,
      formattedCreatedAt,
      isPinned,
      isMyMessage,
      optimisticMessageOpts,
    },
  } = useDiscussionMessage()!;

  const { isFirstMessage, isMiddleMessage, isLastMessage, isRecent } =
    recentMessage;

  const paddingStyles = useMemo(
    () =>
      getVerticalMessagePaddingStyles({
        isFirstMessage,
        isMiddleMessage,
        isLastMessage,
      }),
    [isFirstMessage, isMiddleMessage, isLastMessage],
  );

  return (
    <div
      className={clsx(
        !isRecent && 'py-1',
        isFirstMessage && 'pt-1',
        isLastMessage && 'pb-1',
      )}
    >
      <div
        className={clsx(
          'group relative flex items-baseline px-2 hover:bg-indigo-100/50 sm:px-4',
          isPinned && 'bg-indigo-100/50',
          isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row',
          optimisticMessageOpts?.loading ? 'opacity-50' : 'opacity-100',
          paddingStyles,
        )}
      >
        <div>
          <DiscussionMessageActions />
        </div>
        <div className="flex w-10 flex-shrink-0 items-center justify-center sm:w-14">
          {!isRecent || isFirstMessage ? (
            <div className="rounded-md shadow-md">
              <Avatar
                src={message.createdBy.avatarUrl}
                name={message.createdBy.name}
                profileColor={message.createdBy.profileColor}
                size={isMobile ? 'md' : 'sm'}
              />
            </div>
          ) : (
            <time
              className="hidden text-xs font-medium text-gray-500 sm:group-hover:inline-block"
              dateTime={message.createdAt}
            >
              {formattedCreatedAt}
            </time>
          )}
        </div>
        <div
          className={clsx(
            'ml-2 flex flex-col sm:max-w-[75%]',
            isMyMessage ? 'items-end' : 'items-start',
          )}
        >
          <DiscussionMessageHeader />
          <DiscussionMessageBody />
          {isPinned && (
            <div
              className={clsx(
                'flex items-center space-x-2',
                isMyMessage
                  ? '-mr-4 flex-row'
                  : '-ml-4 flex-row-reverse space-x-reverse',
              )}
            >
              <Text
                as="span"
                size="xs"
                weight="semibold"
                className="text-red-600"
              >
                Pinned by {message.pinnedBy!.name}
              </Text>
              <span className="text-red-600">
                <FontAwesomeIcon
                  icon={faThumbtack}
                  size="xs"
                  className="rotate-45 transform"
                />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export interface Props
  extends Pick<
    DiscussionMessageProviderProps,
    | 'message'
    | 'optimisticMessageOpts'
    | 'recentMessages'
    | 'me'
    | 'discussionId'
  > {}

const DiscussionMessageWithProvider = ({
  message,
  me,
  discussionId,
  recentMessages,
  optimisticMessageOpts,
}: Props) => {
  const isMyMessage = useMemo(
    () => message.createdBy.id === me.id,
    [me.id, message.createdBy.id],
  );

  return (
    <DiscussionMessageProvider
      message={message}
      me={me}
      discussionId={discussionId}
      optimisticMessageOpts={optimisticMessageOpts}
      isMyMessage={isMyMessage}
      recentMessages={recentMessages}
    >
      <DiscussionMessage />
    </DiscussionMessageProvider>
  );
};

export default memo(DiscussionMessageWithProvider);
