import { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import clsx from 'clsx';
import Avatar from '../../../../shared/components/ui/Avatar';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { formatMessageDate } from './utils/format';

interface OptimisticOptions {
  loading: boolean;
  retry(): void;
  error?: ApolloError;
}

interface Props {
  message: Message_Message;
  optimisticOpts?: OptimisticOptions;
  isLast: boolean;
}

const Message = ({ message, optimisticOpts, isLast }: Props) => {
  const formattedDate = useMemo(() => formatMessageDate(message.createdAt), [
    message,
  ]);

  const avatar = useMemo(() => getRandomAvatar(), []);

  return (
    <div className={clsx(isLast ? 'pt-1 pb-4' : 'py-1')}>
      <div
        className={clsx(
          'flex items-center justify-center px-4 hover:bg-gray-100',
          optimisticOpts?.loading ? 'opacity-50' : 'opacity-100'
        )}
      >
        <div className="flex flex-1">
          <Avatar url={avatar} containerClassName="h-5 w-5" rounded />
          <div className="flex flex-col w-full ml-2">
            <div>
              <span className="font-bold text-gray-900">{message.createdBy.name}</span>
              <span className="ml-2 text-xs text-gray-400 font-medium">
                {formattedDate}
              </span>
            </div>
            <div
              className={clsx(
                'text-sm w-full',
                optimisticOpts?.error ? 'text-red-600' : 'text-black'
              )}
            >
              <p className="text-gray-900 font-semibold break-words">{message.content}</p>
              {optimisticOpts?.error && (
                <button
                  type="button"
                  className="font-medium focus:outline-none"
                  onClick={optimisticOpts.retry}
                >
                  Failed to send message. Click to try again.
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;