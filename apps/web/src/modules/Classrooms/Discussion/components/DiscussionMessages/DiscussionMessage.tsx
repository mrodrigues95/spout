import { useMemo } from 'react';
import { ApolloError, gql, useQuery } from '@apollo/client';
import { Badge, Button, Text } from '@spout/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import { Avatar, Card } from '../../../../../shared/components';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { DiscussionEvent } from '../../../../../__generated__/schema.generated';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { MeQuery } from './__generated__/DiscussionMessage.generated';
import { formatMessageDate } from '../../utils/format';
import { UserInfoFragment } from '../../utils/fragments';

interface UserMessageHeaderProps {
  isMyMessage: boolean;
  name: string;
  date: string;
}

const UserMessageHeader = ({
  isMyMessage,
  name,
  date,
}: UserMessageHeaderProps) => {
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

interface UserMessageBodyProps {
  isMyMessage: boolean;
  content: string;
  optimisticOpts?: OptimisticOptions;
}

const UserMessageBody = ({
  isMyMessage,
  content,
  optimisticOpts,
}: UserMessageBodyProps) => {
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

interface CommonMessageProps {
  message: Message_Message;
  date: string;
  avatar: string;
}

interface UserMessageProps extends CommonMessageProps {
  optimisticOpts?: OptimisticOptions;
}

const UserMessage = ({
  message,
  date,
  avatar,
  optimisticOpts,
}: UserMessageProps) => {
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

  return (
    <div
      className={clsx(
        'flex items-center space-x-2 py-2 px-4 hover:bg-indigo-100/50',
        optimisticOpts?.loading ? 'opacity-50' : 'opacity-100',
        isMyMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row space-x-2'
      )}
    >
      <div className="flex items-center justify-center mb-auto p-0.5 bg-white rounded-full shadow-lg">
        <Avatar src={avatar} aria-hidden="true" />
      </div>
      <div className="relative flex flex-col max-w-[75%] space-y-1">
        <UserMessageHeader
          isMyMessage={isMyMessage}
          name={message.createdBy.name}
          date={date}
        />
        <UserMessageBody
          isMyMessage={isMyMessage}
          content={message.content}
          optimisticOpts={optimisticOpts}
        />
      </div>
    </div>
  );
};

interface EventMessageProps extends CommonMessageProps {}

const EventMessage = ({ message, date, avatar }: EventMessageProps) => {
  const isTopic = message.discussionEvent === DiscussionEvent.ChangeTopic;

  return (
    <div className="inline-flex items-center justify-center py-2 px-4 w-full">
      <Card className="flex flex-col p-3 max-w-[75%] rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-2">
            <Avatar src={avatar} aria-hidden="true" size="xs" />
            <Badge scheme="green">@{message.createdBy.name}</Badge>
          </div>
          <div className="inline-flex items-center space-x-2">
            <Text className="text-gray-900 italic" size="sm" weight="medium">
              changed the
            </Text>
            <FontAwesomeIcon
              icon={faCommentAlt}
              className={isTopic ? 'text-pink-700' : 'text-sky-700'}
            />
            <Text
              className={clsx(
                '!ml-1',
                isTopic ? 'text-pink-500' : 'text-sky-500'
              )}
              weight="bold"
              casing="uppercase"
              size="xs"
            >
              {isTopic ? 'Topic' : 'Description'}
            </Text>
            <Text size="xs" weight="medium" color="muted">
              {date}
            </Text>
          </div>
        </div>
        <Text
          className="text-gray-900 break-words whitespace-pre-line"
          weight="medium"
          size="sm"
        >
          {message.content.trim()}
        </Text>
      </Card>
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

const DiscussionMessage = ({ message, optimisticOpts }: Props) => {
  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  const avatar = useMemo(
    () => message.createdBy.avatarUrl ?? getRandomAvatar(),
    [message]
  );

  const isEvent = message.isDiscussionEvent;

  return isEvent ? (
    <EventMessage message={message} date={formattedDate} avatar={avatar} />
  ) : (
    <UserMessage
      message={message}
      date={formattedDate}
      avatar={avatar}
      optimisticOpts={optimisticOpts}
    />
  );
};

export default DiscussionMessage;
