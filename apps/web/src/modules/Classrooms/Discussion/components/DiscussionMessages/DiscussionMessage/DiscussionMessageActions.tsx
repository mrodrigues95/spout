import { faPen, faThumbtack, faLaugh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@spout/toolkit';
import clsx from 'clsx';
import { useDiscussionMessage } from './DiscussionMessageProvider';

const DiscussionMessageActions = () => {
  const {
    data: { isMyMessage, isPinned, isOptimistic },
    state: { isEditing, setIsEditing },
    actions: { pin, unpin },
  } = useDiscussionMessage()!;

  if (isOptimistic || isEditing) return null;

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
              size="sm"
              variant="tertiary"
              icon={<FontAwesomeIcon icon={faLaugh} />}
            />
          </Tooltip>
        </li>
        {isMyMessage && (
          <li>
            <Tooltip label="Edit">
              <IconButton
                aria-label="Edit Message"
                size="sm"
                variant="tertiary"
                className="text-gray-500"
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={() => setIsEditing(true)}
              />
            </Tooltip>
          </li>
        )}
        <li>
          <Tooltip label={isPinned ? 'Unpin' : 'Pin'}>
            <IconButton
              aria-label="Pin Message"
              variant={isPinned ? 'default' : 'tertiary'}
              size="sm"
              icon={
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className={clsx(isPinned ? 'rotate-45' : 'rotate-0')}
                />
              }
              onClick={() => (isPinned ? unpin() : pin())}
            />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default DiscussionMessageActions;
