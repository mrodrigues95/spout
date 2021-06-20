import clsx from 'clsx';
import Avatar from '../../Avatar';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';

interface Props {
  message: { body: string; createdAt: string; createdBy: string };
  isLastMessage: boolean;
}

const Message = ({ message, isLastMessage }: Props) => {
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
            <span className="font-bold">{message.createdBy}</span>
            <span className="ml-2 text-xs text-gray-400 font-medium">
              {message.createdAt}
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
