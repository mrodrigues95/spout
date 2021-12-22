import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import { Avatar } from '../../../../../shared/components';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { MeQuery } from './__generated__/DiscussionMessage.generated';
import { formatMessageDate } from '../../utils/format';
import { UserInfoFragment } from '../../utils/fragments';
import { RecentMessage, RecentMessages } from '../../utils/messages';

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
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      )}
    >
      <span className="font-semibold text-gray-900">
        {isMyMessage ? 'You' : name}
      </span>
      <span className="text-xs font-medium text-gray-500">{date}</span>
    </div>
  );
};

interface DiscussionMessageBodyProps extends Partial<RecentMessage> {
  content: string;
  isMyMessage: boolean;
  optimisticOpts?: OptimisticOptions;
}

const DiscussionMessageBody = ({
  content,
  isMyMessage,
  isRecent,
  isFirstMessage,
  isMiddleMessage,
  isLastMessage,
  optimisticOpts,
}: DiscussionMessageBodyProps) => {
  const borders = ['rounded-l-2xl'];
  if (isRecent) {
    if (isFirstMessage) borders.push('rounded-tr-2xl', 'rounded-br-md');
    if (isMiddleMessage) borders.push('rounded-r-md');
    if (isLastMessage) borders.push('rounded-br-2xl', 'rounded-tr-md');
  } else {
    borders.push('rounded-r-2xl');
  }

  return (
    <div
      className={clsx(
        'p-3 text-sm w-full',
        isMyMessage
          ? 'bg-blue-600 shadow-md'
          : 'bg-white ring-1 ring-gray-900/5 shadow-sm',
        optimisticOpts?.error ? 'text-red-600' : 'text-black',
        borders.join(' ')
      )}
    >
      <p
        className={clsx(
          'break-words text-sm whitespace-pre-line font-medium',
          isMyMessage ? 'text-white' : 'text-gray-900'
        )}
      >
        {content.trim()}
      </p>
      {optimisticOpts?.error && (
        <Button
          type="button"
          variant="unstyled"
          className="font-medium focus:outline-none"
          onClick={optimisticOpts.retry}
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
  if (isFirstMessage) return 'pt-1 pb-0.5';
  if (isMiddleMessage) return 'py-0.5';
  if (isLastMessage) return 'pb-1 pt-0.5';
  return 'py-1';
};

interface OptimisticOptions {
  loading: boolean;
  retry(): void;
  error?: ApolloError;
}

interface Props {
  message: Message_Message;
  recentMessages?: RecentMessages;
  optimisticOpts?: OptimisticOptions;
}

const DiscussionMessage = ({
  message,
  recentMessages,
  optimisticOpts,
}: Props) => {
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

  const isMyMessage = message.createdBy.id === data?.me?.id;

  const { isFirstMessage, isMiddleMessage, isLastMessage, isRecent } =
    recentMessages?.[message.id] || {};

  const messagePadding = getVerticalMessagePadding({
    isFirstMessage,
    isMiddleMessage,
    isLastMessage,
  });

  const formattedDate = useMemo(() => {
    if (isRecent && (isMiddleMessage || isLastMessage)) {
      return formatMessageDate(message.createdAt, 'h:mm a');
    }
    return formatMessageDate(message.createdAt);
  }, [message]);

  return (
    <div
      className={clsx(
        !isRecent && 'py-2',
        isFirstMessage && 'pt-2',
        isLastMessage && 'pb-2'
      )}
    >
      <div
        className={clsx(
          'flex items-center space-x-2 px-4 group hover:bg-indigo-100/50',
          isMyMessage
            ? 'flex-row-reverse space-x-reverse'
            : 'flex-row space-x-2',
          optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
          messagePadding
        )}
      >
        <div className="flex items-center justify-center flex-shrink-0 mb-auto w-14">
          {!isRecent || isFirstMessage ? (
            <div className="rounded-md shadow-md">
              <Avatar
                src={message.createdBy.avatarUrl}
                name={message.createdBy.name}
                profileColor={message.createdBy.profileColor}
              />
            </div>
          ) : (
            <span className="hidden group-hover:inline-block text-xs font-medium text-gray-500">
              {formattedDate}
            </span>
          )}
        </div>
        <div className="relative flex flex-col max-w-[75%] space-y-1">
          {(!isRecent || isFirstMessage) && (
            <DiscussionMessageHeader
              isMyMessage={isMyMessage}
              name={message.createdBy.name}
              date={formattedDate}
            />
          )}
          <DiscussionMessageBody
            content={message.content}
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

export default DiscussionMessage;
