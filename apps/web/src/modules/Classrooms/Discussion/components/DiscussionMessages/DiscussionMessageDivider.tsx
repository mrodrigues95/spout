import { isToday, isYesterday } from 'date-fns';

const MessageDividerSkeleton = () => {
  return (
    <div className="relative w-full animate-pulse opacity-25">
      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full border-t-2 border-gray-400"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 py-1 my-2 w-10 h-6 font-bold bg-gray-400 rounded-full" />
      </div>
    </div>
  );
};

const MessageDivider = ({ date }: { date: string }) => {
  const _date = new Date(date);

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full border-t-2 border-indigo-100"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 py-1 my-2 font-bold text-xs text-gray-900 bg-indigo-100 rounded-full">
          {isToday(_date) && 'Today'}
          {isYesterday(_date) && 'Yesterday'}
          {!isToday(_date) && !isYesterday(_date) && date}
        </span>
      </div>
    </div>
  );
};

MessageDivider.Skeleton = MessageDividerSkeleton;

export default MessageDivider;
