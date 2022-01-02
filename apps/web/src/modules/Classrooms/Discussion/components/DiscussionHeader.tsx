import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheck,
  faChevronDown,
  faInfoCircle,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import { Title, Select, IconButton, Tooltip } from '@spout/toolkit';
import { DiscussionQuery } from './__generated__/Discussion.generated';

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const DiscussionHeader = ({ discussion }: Props) => {
  const router = useRouter();
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(
    discussion.id
  );

  useEffect(() => {
    if (selectedDiscussionId !== discussion.id) {
      router.push(
        `/classrooms/${discussion.classroom.id}/${selectedDiscussionId}`
      );
    }
  }, [discussion.classroom.id, discussion.id, router, selectedDiscussionId]);

  const discussions = [
    ...(discussion.classroom.discussions ?? []),
  ].sort((d1, d2) => d1.name.localeCompare(d2.name));

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Title as="h1" variant="h4">
          # {discussion.name}
        </Title>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={selectedDiscussionId} onChange={setSelectedDiscussionId}>
          <Select.Button
            className="w-72"
            label={discussion.name}
            icon={<FontAwesomeIcon icon={faChevronDown} size="xs" />}
          />
          <Select.Options>
            {discussions.map((discussion) => (
              <Select.Option
                key={discussion.id}
                value={discussion.id}
                label={discussion.name}
                selectedIcon={<FontAwesomeIcon icon={faCheck} size="xs" />}
              />
            ))}
          </Select.Options>
        </Select>
        <Tooltip label="Notifications" placement="bottom">
          <IconButton
            icon={<FontAwesomeIcon icon={faBell} />}
            className="text-gray-500"
            aria-label="Show notifications"
            size="md"
          />
        </Tooltip>
        <Tooltip label="Pinned Messages" placement="bottom">
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={faThumbtack}
                className="transform rotate-45"
              />
            }
            className="text-gray-500"
            aria-label="Show pinned messages"
            size="md"
          />
        </Tooltip>
        <Tooltip label="Show Details" placement="bottom">
          <IconButton
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
            aria-label="Show discussion details"
            size="md"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DiscussionHeader;
