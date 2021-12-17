import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faPencilAlt,
  faUserPlus,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Badge, Text } from '@spout/toolkit';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { Avatar, Card } from '../../../../../shared/components';
import { DiscussionQuery } from '../__generated__/Discussion.generated';

interface TopicOrDescriptionProps {
  content: string;
  icon: IconDefinition;
}

const TopicOrDescription = ({ content, icon }: TopicOrDescriptionProps) => {
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
          Topic
        </Text>
      </div>
      <Text weight="medium">{content}</Text>
    </div>
  );
};

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const WelcomeHeader = ({ discussion }: Props) => {
  return (
    <div className="px-4 py-6">
      <Card className="px-6 py-4 relative overflow-hidden rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <Avatar src={getRandomAvatar()} />
            <Text className="ml-4 mr-2" weight="semibold">
              Welcome to
            </Text>
            <Badge scheme="green"># {discussion.name}</Badge>
          </div>
          {(discussion.topic || discussion.description) && (
            <div className="space-y-2">
              {discussion.topic && (
                <TopicOrDescription
                  content={discussion.topic}
                  icon={faCommentAlt}
                />
              )}
              {discussion.description && (
                <TopicOrDescription
                  content={discussion.description}
                  icon={faPencilAlt}
                />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center space-x-6 w-full">
          <FontAwesomeIcon
            icon={faUserPlus}
            size="2x"
            className="text-indigo-400"
          />
          <Text weight="medium">
            <b className="text-gray-900">Invite others to this server</b> by
            clicking on a share button when you're ready.
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeHeader;
