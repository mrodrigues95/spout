import { memo, useMemo } from 'react';
import { Badge, Text } from '@spout/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentAlt,
  faCommentDots,
} from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Card, Avatar, Quote } from '../../../../../shared/components';
import { formatMessageDate } from '../../../utils/dates';
import { DiscussionMessage } from '../../../utils/messages';
import { MessageEvent } from '../../../../../__generated__/DiscussionOptimisticMessageMutation.graphql';
import clsx from 'clsx';

interface PinnedOrUnpinnedEventMessageProps {
  message: DiscussionMessage;
}

const PinnedOrUnpinnedEventMessage = ({
  message,
}: PinnedOrUnpinnedEventMessageProps) => {
  const { parentMessage } = message;

  if (!parentMessage) {
    console.warn(
      'Pinned or unpinned event message found without an associated parent message.',
      message,
    );
    return null;
  }

  return (
    <div className="pt-3">
      <Quote>
        <Text
          className="whitespace-pre-line break-words text-gray-900"
          size="sm"
        >
          {parentMessage.content.trim()}
        </Text>
        <cite className="inline-flex items-center space-x-2 pt-4 not-italic">
          <Avatar
            src={parentMessage.createdBy.avatarUrl}
            name={parentMessage.createdBy.name}
            profileColor={parentMessage.createdBy.profileColor}
            size="sm"
          />
          <span className="text-xs font-semibold text-gray-900">
            {parentMessage.createdBy.name}
          </span>
        </cite>
      </Quote>
    </div>
  );
};

const getEventAttributes = (event: MessageEvent) => {
  switch (event) {
    case 'CHANGE_DESCRIPTION':
      return {
        icon: faPencilAlt,
        color: 'pink',
        description: 'changed the',
        title: 'Description',
      };
    case 'CHANGE_TOPIC':
      return {
        icon: faCommentAlt,
        color: 'sky',
        description: 'changed the',
        title: 'Topic',
      };
    case 'PINNED_MESSAGE':
      return {
        icon: faCommentDots,
        color: 'purple',
        description: 'pinned a',
        title: 'Message',
      };
    case 'UNPINNED_MESSAGE':
      return {
        icon: faCommentDots,
        color: 'purple',
        description: 'unpinned a',
        title: 'Message',
      };
    default:
      throw new Error('Unsupported event');
  }
};

interface Props {
  message: DiscussionMessage;
}

const DiscussionMessageEvent = ({ message }: Props) => {
  const formattedDate = useMemo(
    () => formatMessageDate(message.createdAt, 'h:mm a'),
    [message.createdAt],
  );

  const { icon, color, description, title } = useMemo(
    () => getEventAttributes(message.messageEvent!),
    [message.messageEvent],
  );

  return (
    <div className="inline-flex w-full items-center justify-center py-2 px-2 sm:px-4">
      <Card className="flex flex-col rounded-md bg-white p-3 shadow-sm ring-1 ring-gray-900/5 sm:max-w-[75%]">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-2">
            <Avatar
              src={message.createdBy.avatarUrl}
              name={message.createdBy.name}
              profileColor={message.createdBy.profileColor}
              size="sm"
            />
            <Badge scheme="green" size="sm" className="hidden sm:inline-flex">
              @{message.createdBy.name}
            </Badge>
          </div>
          <div className="inline-flex items-center space-x-2">
            <Text className="italic text-gray-900" size="sm">
              {description}
            </Text>
            <FontAwesomeIcon icon={icon} className={`text-${color}-700`} />
            <Text
              className="!ml-1 text-gray-900"
              weight="bold"
              casing="uppercase"
              size="xs"
            >
              {title}
            </Text>
            <Text size="xs" weight="medium" color="muted">
              at {formattedDate}
            </Text>
          </div>
        </div>
        {message.messageEvent === 'PINNED_MESSAGE' ||
        message.messageEvent === 'UNPINNED_MESSAGE' ? (
          <PinnedOrUnpinnedEventMessage message={message} />
        ) : (
          <Text
            className={clsx(
              'whitespace-pre-line break-all pt-3 text-gray-900',
              message.content.trim() ? 'block' : 'hidden',
            )}
            size="sm"
          >
            {message.content.trim()}
          </Text>
        )}
      </Card>
    </div>
  );
};

export default memo(DiscussionMessageEvent);
