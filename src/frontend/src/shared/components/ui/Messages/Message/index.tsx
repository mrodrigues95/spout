import { useMemo } from 'react';
import clsx from 'clsx';
import Avatar from '../../Avatar';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';
import { DiscussionMessages_Message } from '~/modules/Discussion/components/DiscussionContainer/__generated__/index.generated';
import { formatMessageDate } from '../utils/format';

interface Props {
  message: DiscussionMessages_Message;
  isLastMessage: boolean;
}

const Message = ({ message, isLastMessage }: Props) => {
  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  return (
    <div
      className={clsx(
        'flex items-center justify-center',
        isLastMessage && 'pb-2'
      )}
    >
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
