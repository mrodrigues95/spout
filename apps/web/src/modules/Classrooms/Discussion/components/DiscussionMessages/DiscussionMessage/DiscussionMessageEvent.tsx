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
    [event],
  );

  return (
    <div className="inline-flex w-full items-center justify-center py-2 px-4">
      <Card className="flex max-w-[75%] flex-col rounded-md bg-white p-3 shadow-sm ring-1 ring-gray-900/5">
        <div className="flex items-center space-x-2 pb-4">
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
            <Text className="italic text-gray-900" size="sm" weight="medium">
              changed the
            </Text>
            <FontAwesomeIcon
              icon={faCommentAlt}
              className={isTopic ? 'text-pink-700' : 'text-sky-700'}
            />
            <Text
              className={clsx(
                '!ml-1',
                isTopic ? 'text-pink-500' : 'text-sky-500',
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
          className="whitespace-pre-line break-words text-gray-900"
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
