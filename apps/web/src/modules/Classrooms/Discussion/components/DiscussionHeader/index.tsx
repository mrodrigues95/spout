import { useEffect, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronDown,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Title, Select, IconButton, Tooltip } from '@spout/toolkit';
import { DiscussionHeader_discussion$key } from '../../../../../__generated__/DiscussionHeader_discussion.graphql';
import DiscussionHeaderNotifications from './DiscussionHeaderNotifications';
import DiscussionHeaderPinnedMessages from './DiscussionHeaderPinnedMessages';

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
  setShowDetails: () => void;
}

const DiscussionHeader = ({ discussion, setShowDetails }: Props) => {
  const data = useFragment(fragment, discussion);

  const router = useRouter();
  const [selectedDiscussionId, setSelectedDiscussionId] = useState(data.id);

  useEffect(() => {
    if (selectedDiscussionId !== data.id) {
      router.push(`/classrooms/${data.classroom.id}/${selectedDiscussionId}`);
    }
  }, [data.classroom.id, data.id, router, selectedDiscussionId]);

  const discussions = [...(data.classroom.discussions ?? [])].sort((d1, d2) =>
    d1.name.localeCompare(d2.name)
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
        <DiscussionHeaderNotifications />
        <DiscussionHeaderPinnedMessages />
        <Tooltip label="Show Details" placement="bottom">
          <IconButton
            icon={<FontAwesomeIcon icon={faInfoCircle} />}
            className="text-blue-500 hover:text-blue-700 focus:text-blue-700"
            aria-label="Show discussion details"
            size="md"
            onClick={setShowDetails}
          />
        </Tooltip>
      </div>
    </article>
  );
};

export default DiscussionHeader;
