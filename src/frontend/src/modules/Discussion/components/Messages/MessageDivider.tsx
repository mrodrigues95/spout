import { isToday, isYesterday } from 'date-fns';

const MessageDivider = ({ date }: { date: string }) => {
  const d = new Date(date);
  
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white font-bold">
          {isToday(d) && 'Today'}
          {isYesterday(d) && 'Yesterday'}
          {!isToday(d) && !isYesterday(d) && date}
        </span>
      </div>
    </div>
  );
};

export default MessageDivider;
