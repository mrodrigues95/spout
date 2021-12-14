import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLaughSquint } from '@fortawesome/free-regular-svg-icons';
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { IconButton } from '@spout/toolkit';
import { formatNewMessage } from './utils/format';
import { TextArea } from '../../../../../shared/components';
import { useStore } from './utils/messagesStore';
import { MeQuery } from './__generated__/MessageComposer.generated';
import { UserInfoFragment } from '../../utils/fragments';

interface Props {
  discussionId: string;
}

const MessageComposer = ({ discussionId }: Props) => {
  const { data } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `
  );
  const add = useStore((state) => state.add);
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const handleNewMessage = () => {
    if (message.trim().length) {
      add(discussionId, formatNewMessage(message.trim()), data!.me!);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) handleNewMessage();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If the user wants to enter a new line, they must use SHIFT+ENTER.
    if (e.target.value !== '\n') setMessage(e.target.value);
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between h-full p-3 pointer-events-auto bg-white border-2 rounded-md transition ease-in-out duration-150',
        focused ? 'border-transparent ring-2 ring-black' : 'border-gray-200'
      )}
    >
      <div className="flex flex-col w-full space-y-3">
        <TextArea
          placeholder="Message #discussion"
          value={message}
          aria-label="Enter message"
          onChange={handleOnChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyPress={handleKeyPress}
          className="p-0"
          maxRows={5}
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <IconButton
              icon={<FontAwesomeIcon icon={faLaughSquint} />}
              aria-label="View emojis"
            />
            <IconButton
              icon={<FontAwesomeIcon icon={faPaperclip} />}
              aria-label="Add attachment"
            />
          </div>
          <IconButton
            icon={<FontAwesomeIcon icon={faPaperPlane} />}
            aria-label="Send message"
            onClick={handleNewMessage}
            variant="solid"
            scheme="orange"
            disabled={!message}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
