import { isToday, isYesterday } from 'date-fns';

const DiscussionMessageDivider = ({ date }: { date: string }) => {
  const _date = new Date(date);

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center px-2 sm:px-4">
        <div className="w-full border-t-2 border-indigo-100"></div>
      </div>
      <div className="relative flex justify-center py-2">
        <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-semibold text-gray-900">
          {isToday(_date) && 'Today'}
          {isYesterday(_date) && 'Yesterday'}
          {!isToday(_date) && !isYesterday(_date) && date}
        </span>
      </div>
    </div>
  );
};

export default DiscussionMessageDivider;
