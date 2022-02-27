import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faPencilAlt,
  faUserPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Badge, Text } from '@spout/toolkit';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { Image, Card } from '../../../../../shared/components';
import { DiscussionMessagesListHeader_discussion$key } from '../../../../../__generated__/DiscussionMessagesListHeader_discussion.graphql';

interface TopicOrDescriptionProps {
  content: string;
  icon: IconDefinition;
  label: 'Topic' | 'Description';
}

const TopicOrDescription = ({
  content,
  icon,
  label,
}: TopicOrDescriptionProps) => {
  return (
    <div>
      <div className="inline-flex items-center space-x-2">
        <FontAwesomeIcon icon={icon} className="text-gray-500" />
        <Text
          as="span"
          casing="uppercase"
          size="sm"
          weight="bold"
          className="text-gray-900"
        >
          {label}
        </Text>
      </div>
      <Text className="whitespace-pre-line" weight="medium">
        {content}
      </Text>
    </div>
  );
};

const fragment = graphql`
  fragment DiscussionMessagesListHeader_discussion on Discussion {
    name
    topic
    description
  }
`;

interface Props {
  discussion: DiscussionMessagesListHeader_discussion$key;
}

const DiscussionMessagesListHeader = ({ discussion }: Props) => {
  const data = useFragment(fragment, discussion);

  return (
    <Card className="relative space-y-4 overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm ring-1 ring-gray-900/5">
      <div className="space-y-4">
        <div className="flex items-center">
          <Image src={getRandomAvatar()} alt="" />
          <Text className="mx-2" weight="semibold">
            Welcome to
          </Text>
          <Badge scheme="green"># {data.name}</Badge>
        </div>
        {(data.topic || data.description) && (
          <div className="space-y-2">
            {data.topic && (
              <TopicOrDescription
                content={data.topic}
                icon={faCommentAlt}
                label="Topic"
              />
            )}
            {data.description && (
              <TopicOrDescription
                content={data.description}
                icon={faPencilAlt}
                label="Description"
              />
            )}
          </div>
        )}
      </div>
      <div className="flex w-full items-center justify-center space-x-6">
        <FontAwesomeIcon
          icon={faUserPlus}
          size="2x"
          className="text-indigo-400"
        />
        <Text weight="medium">
          <b className="text-gray-900">Invite others to this server</b> by
          clicking on a share button when you&apos;re ready.
        </Text>
      </div>
    </Card>
  );
};

export default DiscussionMessagesListHeader;
