import { useMemo } from 'react';
import clsx from 'clsx';
import Avatar from '../../../../shared/components/ui/Avatar';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { formatMessageDate } from '../../utils/format';

interface Props {
  message: Message_Message;
  isLast: boolean;
}

const Message = ({ message, isLast }: Props) => {
  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  const avatar = useMemo(() => getRandomAvatar(), []);

  return (
    <div
      className={clsx(
        'flex items-center justify-center px-4',
        isLast ? 'pt-1 pb-4' : 'py-1'
      )}
    >
      <div className="flex flex-1">
        <Avatar url={avatar} containerClassName="h-5 w-5" rounded />
        <div className="flex flex-col w-full ml-2">
          <div>
            <span className="font-bold">{message.createdBy.name}</span>
            <span className="ml-2 text-xs text-gray-400 font-medium">
              {formattedDate}
            </span>
          </div>
          <p className="font-semibold text-sm w-full break-words">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Message;
