import { faPen, faThumbtack, faLaugh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@spout/toolkit';
import clsx from 'clsx';

interface Props {
  isMyMessage: boolean;
  isOptimistic: boolean;
}

const Actions = ({ isMyMessage, isOptimistic }: Props) => {
  if (isOptimistic) return null;

  return (
    <div
      className={clsx(
        'absolute -top-2 z-10 hidden px-4 group-hover:block',
        isMyMessage ? 'left-0' : 'right-0',
      )}
    >
      <ul className="flex items-center space-x-1 rounded-md bg-white p-1 shadow-md ring-1 ring-gray-900/5">
        <li>
          <Tooltip label="Add Reaction">
            <IconButton
              aria-label="Add Reaction"
              className="text-gray-500"
              icon={<FontAwesomeIcon icon={faLaugh} />}
            />
          </Tooltip>
        </li>
        <li>
          <Tooltip label="Edit">
            <IconButton
              aria-label="Edit Message"
              className="text-gray-500"
              icon={<FontAwesomeIcon icon={faPen} />}
            />
          </Tooltip>
        </li>
        <li>
          <Tooltip label="Pin">
            <IconButton
              aria-label="Pin Message"
              className="text-gray-500"
              icon={<FontAwesomeIcon icon={faThumbtack} />}
            />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default Actions;
