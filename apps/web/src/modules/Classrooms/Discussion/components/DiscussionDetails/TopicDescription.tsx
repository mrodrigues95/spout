import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Text } from '@spout/toolkit';

const TopicDescription = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2">
          <FontAwesomeIcon icon={faCommentAlt} className="text-gray-500" />
          <Text color="muted" size="xs" weight="medium" casing="uppercase">
            Topic
          </Text>
        </div>
        <Text className="text-gray-900" weight="medium">
          This is an example topic
        </Text>
      </div>
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center space-x-2">
          <FontAwesomeIcon icon={faPencilAlt} className="text-gray-500" />
          <Text color="muted" size="xs" weight="medium" casing="uppercase">
            Description
          </Text>
        </div>
        <Text className="text-gray-900" weight="medium">
          This is an example
        </Text>
      </div>
    </div>
  );
};

export default TopicDescription;
