import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { Avatar, Card } from '../../../../../shared/components';

// Should say:
// Welcome to <Discussion>
//
const WelcomeBanner = () => {
  return (
    <div className="px-4 py-6">
      <Card className="rounded-md shadow-sm bg-white ring-1 ring-gray-900/5">
        <Avatar src={getRandomAvatar()} />
        Welcome to # general
        <FontAwesomeIcon icon={faCommentAlt} /> TOPIC
        <FontAwesomeIcon icon={faPencilAlt} /> DESCRIPTION
        <FontAwesomeIcon icon={faUserPlus} /> Invite others to this server
      </Card>
    </div>
  );
};

export default WelcomeBanner;
