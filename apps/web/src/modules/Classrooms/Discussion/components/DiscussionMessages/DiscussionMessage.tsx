import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import { Avatar } from '../../../../../shared/components';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { MeQuery } from './__generated__/DiscussionMessage.generated';
import { formatMessageDate } from '../../utils/format';
import { UserInfoFragment } from '../../utils/fragments';
import { RecentMessages } from '../../utils/messages';

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

interface DiscussionMessageBodyProps {
  isMyMessage: boolean;
  content: string;
  optimisticOpts?: OptimisticOptions;
}

const DiscussionMessageBody = ({
  isMyMessage,
  content,
  optimisticOpts,
}: DiscussionMessageBodyProps) => {
  return (
    <div
      className={clsx(
        'p-3 text-sm w-full rounded-md shadow-sm',
        isMyMessage ? 'bg-blue-600' : 'bg-white ring-1 ring-gray-900/5',
        optimisticOpts?.error ? 'text-red-600' : 'text-black'
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

// TODO: Border radius should mimic something like messenger (3/4 corners are rounded.)
// TODO: Messages sent around the same time should be grouped (don't show avatar).
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

  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  const isMyMessage = message.createdBy.id === data?.me?.id;

  const { isFirstMessage, isRecent } = recentMessages?.[message.id] || {};

  return (
    <div
      className={clsx(
        'flex items-center space-x-2 py-2 px-4 hover:bg-indigo-100/50',
        optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row space-x-2'
      )}
    >
      <div className="flex items-center justify-center mb-auto rounded-md shadow-md">
        {isFirstMessage || !isRecent ? (
          <Avatar
            src={message.createdBy.avatarUrl}
            name={message.createdBy.name}
            profileColor={message.createdBy.profileColor}
          />
        ) : (
          <span>DATE HERE</span>
        )}
      </div>
      <div className="relative flex flex-col max-w-[75%] space-y-1">
        {(isFirstMessage || !isRecent) && (
          <DiscussionMessageHeader
            isMyMessage={isMyMessage}
            name={message.createdBy.name}
            date={formattedDate}
          />
        )}
        <DiscussionMessageBody
          isMyMessage={isMyMessage}
          content={message.content}
          optimisticOpts={optimisticOpts}
        />
      </div>
    </div>
  );
};

export default DiscussionMessage;
