import { useContext, useState } from 'react';
import clsx from 'clsx';
import { EmojiHappyIcon, PaperClipIcon, ChevronIcon } from '~/shared/assets';
import { formatNewMessage } from '../utils/format';
import TextArea from '../../TextArea';
import Button from '../../Button';
import { MessageContext } from '../MessageProvider';

const MessageComposer = () => {
  const { onNewMessage } = useContext(MessageContext)!;
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const handleNewMessage = () => {
    if (message.trim().length !== 0) {
      onNewMessage(formatNewMessage(message));
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
    <div className="z-10 px-4 pb-3 bg-white">
      <div
        className={clsx(
          'flex items-center justify-between h-full p-3 pointer-events-auto bg-white border-2 rounded-md transition ease-in-out duration-150',
          focused ? 'border-transparent ring-2 ring-black' : 'border-gray-200'
        )}
      >
        <div className="flex flex-1 items-center">
          <Button
            className="focus:outline-none"
            aria-label="View emojis"
            ignoreStyles
          >
            <EmojiHappyIcon className="h-5 w-5 text-gray-600 hover:text-gray-500" />
          </Button>
          <TextArea
            placeholder="Message..."
            value={message}
            aria-label="Enter message"
            onChange={handleOnChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="flex items-center ml-8">
          <Button
            className="focus:outline-none"
            aria-label="Add attachment"
            ignoreStyles
          >
            <PaperClipIcon className="h-5 w-5 text-gray-600 hover:text-gray-500" />
          </Button>
          <Button
            rounded="full"
            active
            className="ml-4 p-2 shadow-lg"
            aria-label="Send message"
            onClick={handleNewMessage}
          >
            <ChevronIcon className="h-5 w-5 text-white transform rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageComposer;
