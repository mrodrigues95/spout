import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Badge, Text } from '@spout/toolkit';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { Avatar, Card } from '../../../../../shared/components';

const WelcomeHeader = () => {
  return (
    <div className="px-4 py-6">
      <Card className="px-6 py-4 relative overflow-hidden rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-y-4">
        <div className="space-y-4">
          <div className="flex items-center">
            <Avatar src={getRandomAvatar()} />
            <Text className="ml-4 mr-2" weight="semibold">
              Welcome to
            </Text>
            <Badge scheme="green"># general</Badge>
          </div>
          <div className="space-y-2">
            <div>
              <div className="inline-flex items-center space-x-2">
                <FontAwesomeIcon
                  icon={faCommentAlt}
                  className="text-gray-500"
                />
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
              <Text weight="medium">This is a topic</Text>
            </div>
            <div>
              <div className="inline-flex items-center space-x-2">
                <FontAwesomeIcon icon={faPencilAlt} className="text-gray-500" />
                <Text
                  as="span"
                  casing="uppercase"
                  size="sm"
                  weight="bold"
                  className="text-gray-900"
                >
                  Description
                </Text>
              </div>
              <Text weight="medium">This is a description</Text>
            </div>
          </div>
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
