const MessageDivider = ({ date }: { date: string }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center px-4">
        <div className="w-full border-t border-gray-200"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white font-bold">{date}</span>
      </div>
    </div>
  );
};

export default MessageDivider;
