import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { Button } from '@spout/toolkit';
import clsx from 'clsx';
import Avatar from '../../../../../shared/components/ui/Avatar';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { MeQuery } from './__generated__/Message.generated';
import { formatMessageDate } from './utils/format';
import { UserInfoFragment } from '../../utils/fragments';

interface MessageMetaProps {
  isMine: boolean;
  name: string;
  date: string;
}

const MessageMeta = ({ isMine, name, date }: MessageMetaProps) => {
  return (
    <div
      className={clsx(
        'flex items-center space-x-2',
        isMine ? 'flex-row-reverse space-x-reverse' : 'flex-row'
      )}
    >
      <span className="font-semibold text-gray-900">
        {isMine ? 'You' : name}
      </span>
      <span className="text-xs font-medium text-gray-500">{date}</span>
    </div>
  );
};

interface MessageContentProps {
  isMine: boolean;
  content: string;
  optimisticOpts?: OptimisticOptions;
}

const MessageContent = ({
  isMine,
  content,
  optimisticOpts,
}: MessageContentProps) => {
  return (
    <div
      className={clsx(
        'p-3 text-sm w-full rounded-xl shadow-container',
        isMine ? 'bg-blue-600' : 'bg-white',
        optimisticOpts?.error ? 'text-red-600' : 'text-black'
      )}
    >
      <p
        className={clsx(
          'break-words prose-sm',
          isMine ? 'text-white font-normal' : 'text-gray-900 font-medium'
        )}
      >
        {content}
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
  isLast: boolean;
}

const Message = ({ message, optimisticOpts, isLast }: Props) => {
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

  const isMine = message.createdBy.id === data!.me!.id;

  return (
    <div
      className={clsx(
        'flex items-center space-x-2 my-4',
        optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
        isMine ? 'flex-row-reverse space-x-reverse' : 'flex-row space-x-2',
        isLast ? 'pt-1 pb-4' : 'py-1'
      )}
    >
      <div className="flex items-center justify-center mb-auto rounded-full">
        <Avatar src={avatar} aria-hidden="true" />
      </div>
      <div className="relative flex flex-col max-w-[75%] space-y-1">
        <MessageMeta
          isMine={isMine}
          name={message.createdBy.name}
          date={formattedDate}
        />
        <MessageContent
          isMine={isMine}
          content={message.content}
          optimisticOpts={optimisticOpts}
        />
      </div>
    </div>
  );
};

export default Message;
