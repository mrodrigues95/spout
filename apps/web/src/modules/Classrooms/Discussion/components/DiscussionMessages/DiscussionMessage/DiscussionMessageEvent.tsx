import { memo, useMemo } from 'react';
import { Badge, Text } from '@spout/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';
import { Card, Avatar } from '../../../../../../shared/components';
import { formatMessageDate } from '../../../utils/dates';
import { DiscussionMessage } from '../../../utils/messages';

interface Props {
  event: DiscussionMessage;
}

const DiscussionMessageEvent = ({ event }: Props) => {
  const isTopic = event.discussionEvent === 'CHANGE_TOPIC';

  const formattedDate = useMemo(
    () => formatMessageDate(event.createdAt, 'h:mm a'),
    [event]
  );

  return (
    <div className="inline-flex items-center justify-center py-2 px-4 w-full">
      <Card className="flex flex-col p-3 max-w-[75%] rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="inline-flex items-center space-x-2">
            <Avatar
              src={event.createdBy.avatarUrl}
              name={event.createdBy.name}
              profileColor={event.createdBy.profileColor}
              size="sm"
            />
            <Badge scheme="green">@{event.createdBy.name}</Badge>
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
          {event.content.trim()}
        </Text>
      </Card>
    </div>
  );
};

export default memo(DiscussionMessageEvent);
