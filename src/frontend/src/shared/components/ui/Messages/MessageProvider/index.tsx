import { createContext, ReactNode, useCallback } from 'react';
import { Message } from '~/__generated__/schema.generated';

interface MessageContextType {
  onNewMessage(message: Partial<Message>): void;
}

export const MessageContext = createContext<MessageContextType | null>(null);

interface Props extends MessageContextType {
  children: ReactNode;
}

const MessageProvider = ({ onNewMessage: onNewMessageCb, children }: Props) => {
    
  const onNewMessage = useCallback(
    (message: Partial<Message>) => {
      onNewMessageCb(message);
    },
    [onNewMessageCb]
  );

  return (
    <MessageContext.Provider value={{ onNewMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
