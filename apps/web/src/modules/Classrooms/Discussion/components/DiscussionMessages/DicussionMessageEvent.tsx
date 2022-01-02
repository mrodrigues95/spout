import { useMemo } from 'react';
import { Badge, Text } from '@spout/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import { Card, Avatar } from '../../../../../shared/components';
import { DiscussionEvent } from '../../../../../__generated__/schema.generated';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { formatMessageDate } from '../../utils/dates';

interface Props {
  messageEvent: Message_Message;
}

const DiscussionMessageEvent = ({ messageEvent }: Props) => {
  const isTopic = messageEvent.discussionEvent === DiscussionEvent.ChangeTopic;
  const formattedDate = useMemo(
    () => formatMessageDate(messageEvent.createdAt, 'h:mm a'),
    [messageEvent]
  );

  return (
    <div className="inline-flex items-center justify-center py-2 px-4 w-full">
      <Card className="flex flex-col p-3 max-w-[75%] rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-2">
            <Avatar
              src={messageEvent.createdBy.avatarUrl}
              name={messageEvent.createdBy.name}
              profileColor={messageEvent.createdBy.profileColor}
              size="sm"
            />
            <Badge scheme="green">@{messageEvent.createdBy.name}</Badge>
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
              at {formattedDate}
            </Text>
          </div>
        </div>
        <Text
          className="text-gray-900 break-words whitespace-pre-line"
          weight="medium"
          size="sm"
        >
          {messageEvent.content.trim()}
        </Text>
      </Card>
    </div>
  );
};

export default DiscussionMessageEvent;
