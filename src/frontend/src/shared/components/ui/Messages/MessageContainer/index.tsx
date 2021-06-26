import MessageDivider from '../MessageDivider';
import Message from '../Message';
import MessageComposer from '../MessageComposer';

const testMessage = {
  body: 'Wow, this is cool!',
  createdAt: 'November 04/2020',
  createdBy: 'Marcus Rodrigues',
};

const MessageContainer = () => {
  return (
    <>
      <div className="flex flex-col absolute inset-0 border border-transparent sm:shadow-container sm:rounded-md">
        <div className="h-full px-4 py-2 overflow-y-auto">
          <MessageDivider date="November 04/2020" />
          <Message message={testMessage} isLastMessage />
        </div>
        <MessageComposer />
      </div>
    </>
  );
};

export default MessageContainer;
