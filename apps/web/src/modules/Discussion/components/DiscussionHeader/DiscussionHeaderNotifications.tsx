import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { IconButton, Tooltip } from '@spout/toolkit';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../shared/hooks';

const DiscussionHeaderNotifications = () => {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.XL);

  return (
    <Tooltip label="Notifications" placement="bottom">
      <IconButton
        icon={<FontAwesomeIcon icon={faBell} />}
        aria-label="Show notifications"
        size={isDesktop ? 'md' : 'sm'}
        variant="tertiary"
        className="hidden lg:flex"
      />
    </Tooltip>
  );
};

export default DiscussionHeaderNotifications;
