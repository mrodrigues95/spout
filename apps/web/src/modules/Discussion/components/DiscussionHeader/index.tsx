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
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { useDiscussion } from '../DiscussionProvider';
import DiscussionHeaderNotifications from './DiscussionHeaderNotifications';
import DiscussionHeaderPinnedMessages from './DiscussionHeaderPinnedMessages';
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
  const isDesktop = useMediaQuery(MEDIA_QUERIES.XL);
  const { setShowDetails } = useDiscussion()!;

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
    <div className="flex min-w-0 flex-1 items-center justify-between">
      <Title as="h1" variant="h5" className="mr-4 truncate">
        # {data.name}
      </Title>
      <div className="flex items-center space-x-2">
        <Select
          className="hidden md:block"
          value={selectedDiscussionId}
          onChange={setSelectedDiscussionId}
        >
          <Select.Button
            className="w-48 xl:w-72"
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
            size={isDesktop ? 'md' : 'sm'}
            variant="tertiary"
            onClick={() => setShowDetails((prev) => !prev)}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default DiscussionHeader;
