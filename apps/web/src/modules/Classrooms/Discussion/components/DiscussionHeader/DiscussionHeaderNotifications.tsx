import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@spout/toolkit';

const DiscussionHeaderNotifications = () => {
  return (
    <Tooltip label="Notifications" placement="bottom">
      <IconButton
        icon={<FontAwesomeIcon icon={faBell} />}
        aria-label="Show notifications"
        size="md"
        variant="tertiary"
      />
    </Tooltip>
  );
};

export default DiscussionHeaderNotifications;
