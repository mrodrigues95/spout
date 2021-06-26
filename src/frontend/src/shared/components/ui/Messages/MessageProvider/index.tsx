import { createContext, ReactNode, useCallback } from 'react';

interface MessageContextType {
  onNewMessage(message: string): void;
}

export const MessageContext = createContext<MessageContextType | null>(null);

interface Props extends MessageContextType {
  children: ReactNode;
}

const MessageProvider = ({ onNewMessage: onNewMessageCb, children }: Props) => {
  const onNewMessage = useCallback(
    (message: string) => {
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
