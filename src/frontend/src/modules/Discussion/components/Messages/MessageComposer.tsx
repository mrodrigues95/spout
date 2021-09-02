import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { EmojiHappyIcon, PaperClipIcon, ChevronIcon } from '~/shared/assets';
import { formatNewMessage } from './utils/format';
import { TextArea, Button } from '~/shared/components';
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
    if (message.trim().length !== 0) {
      add(discussionId, formatNewMessage(message), data!.me!);
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
            className="px-0"
            aria-label="View emojis"
            size="sm"
            rounded="full"
            variant="ghost"
            active={false}
          >
            <EmojiHappyIcon className="h-5 w-5 text-gray-400 hover:text-gray-900" />
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
        <div className="flex items-center ml-8 space-x-1">
          <Button
            aria-label="Add attachment"
            size="sm"
            rounded="full"
            variant="ghost"
            active={false}
          >
            <PaperClipIcon className="h-5 w-5 text-gray-400 hover:text-gray-900" />
          </Button>
          <Button
            aria-label="Send message"
            rounded="full"
            className="!p-2 shadow-lg"
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
