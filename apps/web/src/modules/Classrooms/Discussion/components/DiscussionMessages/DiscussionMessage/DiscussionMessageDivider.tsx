import { memo } from 'react';
import { isToday, isYesterday } from 'date-fns';

const DiscussionMessageDivider = ({ date }: { date: string }) => {
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

export default memo(DiscussionMessageDivider);
