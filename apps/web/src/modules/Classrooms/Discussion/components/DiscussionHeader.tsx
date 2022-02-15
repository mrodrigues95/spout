import { useEffect, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
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
import { DiscussionHeader_discussion$key } from './__generated__/DiscussionHeader_discussion.graphql';

const fragment = graphql`
  fragment DiscussionHeader_discussion on Discussion {
    id
    name
    classroom {
      id
      discussions {
        id
        name
      }
    }
  }
`;

interface Props {
  discussion: DiscussionHeader_discussion$key;
}

const DiscussionHeader = ({ discussion }: Props) => {
  const data = useFragment(fragment, discussion);

  const router = useRouter();
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(data.id);

  useEffect(() => {
    if (selectedDiscussionId !== data.id) {
      router.push(`/classrooms/${data.classroom.id}/${selectedDiscussionId}`);
    }
  }, [data.classroom.id, data.id, router, selectedDiscussionId]);

  const discussions = [...(data.classroom.discussions ?? [])].sort((d1, d2) =>
    d1.name.localeCompare(d2.name),
  );

  return (
    <article className="flex items-center justify-between">
      <div className="flex-1">
        <Title as="h1" variant="h4">
          # {data.name}
        </Title>
      </div>
      <div className="flex items-center space-x-2">
        <Select value={selectedDiscussionId} onChange={setSelectedDiscussionId}>
          <Select.Button
            className="w-72"
            label={data.name}
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
                className="rotate-45 transform"
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
    </article>
  );
};

export default DiscussionHeader;
