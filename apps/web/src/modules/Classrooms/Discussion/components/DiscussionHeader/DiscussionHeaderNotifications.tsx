import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@spout/toolkit';

const DiscussionHeaderNotifications = () => {
  return (
    <Tooltip label="Notifications" placement="bottom">
      <IconButton
        icon={<FontAwesomeIcon icon={faBell} />}
        className="text-gray-500"
        aria-label="Show notifications"
        size="md"
      />
    </Tooltip>
  );
};

export default DiscussionHeaderNotifications;
