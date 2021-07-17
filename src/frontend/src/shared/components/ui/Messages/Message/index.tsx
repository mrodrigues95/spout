import { useMemo } from 'react';
import Avatar from '../../Avatar';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';
import { Message_Message } from '~/modules/Discussion/components/DiscussionContainer/__generated__/index.generated';
import { formatMessageDate } from '../utils/format';

interface Props {
  message: Message_Message;
}

const Message = ({ message }: Props) => {
  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-1">
        <Avatar url={getRandomAvatar()} containerClassName="h-5 w-5" rounded />
        <div className="flex flex-col w-full ml-2">
          <div>
            <span className="font-bold">{message.createdBy.name}</span>
            <span className="ml-2 text-xs text-gray-400 font-medium">
              {formattedDate}
            </span>
          </div>
          <p className="font-semibold text-sm w-full break-all">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
