import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import Avatar from '../Avatar';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import { Message_Message } from '../../../../modules/Classrooms/Discussion/utils/__generated__/fragments.generated';
import { MeQuery } from './__generated__/Message.generated';
import { formatMessageDate } from './utils/format';
import { UserInfoFragment } from '../../../../modules/Classrooms/Discussion/utils/fragments';

interface MessageHeaderProps {
  isMyMessage: boolean;
  name: string;
  date: string;
}

const MessageHeader = ({ isMyMessage, name, date }: MessageHeaderProps) => {
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

interface MessageContentProps {
  isMyMessage: boolean;
  content: string;
  optimisticOpts?: OptimisticOptions;
}

const MessageContent = ({
  isMyMessage,
  content,
  optimisticOpts,
}: MessageContentProps) => {
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
          'break-words prose-sm whitespace-pre-line font-medium',
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
  optimisticOpts?: OptimisticOptions;
}

const Message = ({ message, optimisticOpts }: Props) => {
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

  const avatar = useMemo(
    () => message.createdBy.avatarUrl ?? getRandomAvatar(),
    [message]
  );

  const isMyMessage = message.createdBy.id === data!.me!.id;

  return (
    <div
      className={clsx(
        'flex items-center space-x-2 py-2 px-4 hover:bg-indigo-100/50',
        optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row space-x-2'
      )}
    >
      <div className="flex items-center justify-center mb-auto rounded-full">
        <Avatar src={avatar} aria-hidden="true" />
      </div>
      <div className="relative flex flex-col max-w-[75%] space-y-1">
        <MessageHeader
          isMyMessage={isMyMessage}
          name={message.createdBy.name}
          date={formattedDate}
        />
        <MessageContent
          isMyMessage={isMyMessage}
          content={message.content}
          optimisticOpts={optimisticOpts}
        />
      </div>
    </div>
  );
};

export default Message;
