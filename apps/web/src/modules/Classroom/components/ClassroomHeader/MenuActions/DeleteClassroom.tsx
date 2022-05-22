import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@spout/toolkit';

const DeleteClassroom = () => {
  return (
    <Menu.Item leftIcon={<FontAwesomeIcon icon={faArrowRightToBracket} />}>
      Leave classroom
    </Menu.Item>
  );
};

export default DeleteClassroom;
