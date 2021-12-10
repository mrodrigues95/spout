import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheck,
  faChevronDown,
  faInfoCircle,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import { Title, Select, IconButton } from '@spout/toolkit';
import { DiscussionInfo_Discussion } from './__generated__/Discussion.generated';

interface Props {
  discussion: DiscussionInfo_Discussion;
}

const DiscussionHeader = ({ discussion }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <Title as="h1" variant="h4">
          # {discussion.name}
        </Title>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={discussion.id} onChange={() => {}}>
          <Select.Button
            className="w-48"
            label={discussion.name}
            icon={<FontAwesomeIcon icon={faChevronDown} size="xs" />}
          />
          <Select.Options>
            {discussion.classroom.discussions.map((discussion) => (
              <Select.Option
                key={discussion.id}
                value={discussion.id}
                label={discussion.name}
                selectedIcon={<FontAwesomeIcon icon={faCheck} size="xs" />}
                role="link"
              />
            ))}
          </Select.Options>
        </Select>
        <IconButton
          icon={<FontAwesomeIcon icon={faBell} />}
          className="text-gray-500 hover:text-gray-900 focus:text-gray-900"
          aria-label="Show notifications"
          size="md"
        />
        <IconButton
          icon={
            <FontAwesomeIcon
              icon={faThumbtack}
              className="transform rotate-45"
            />
          }
          className="text-gray-500 hover:text-gray-900 focus:text-gray-900"
          aria-label="Show pinned messages"
          size="md"
        />
        <IconButton
          icon={<FontAwesomeIcon icon={faInfoCircle} />}
          className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
          aria-label="Show discussion details"
          size="md"
        />
      </div>
    </div>
  );
};

export default DiscussionHeader;
