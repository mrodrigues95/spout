import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { formatMessageDate } from '../../../utils/dates';
import {
  DiscussionMessage,
  RecentMessage,
  RecentMessages,
} from '../../../utils/messages';

interface OptimisticMessageOptions {
  loading: boolean;
  retry(): void;
  hasError: boolean;
}

interface TDiscussionMessageContext {
  message: DiscussionMessage;
  formattedCreatedAt: string;
  isOptimistic: boolean;
  isMyMessage: boolean;
  isEditing: boolean;
  setIsEditing(val: boolean): void;
  recentMessage: RecentMessage;
  optimisticMessageOpts?: OptimisticMessageOptions;
}

const DiscussionMessageContext = createContext<TDiscussionMessageContext | null>(
  null
);

export interface Props
  extends Pick<
    TDiscussionMessageContext,
    'message' | 'isMyMessage' | 'optimisticMessageOpts'
  > {
  recentMessages?: RecentMessages;
  children: ReactNode;
}

export const DiscussionMessageProvider = ({
  message,
  recentMessages,
  isMyMessage,
  optimisticMessageOpts,
  children,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const recentMessage = useMemo(() => recentMessages?.[message.id] || {}, [
    message.id,
    recentMessages,
  ]) as RecentMessage;

  const formattedCreatedAt = useMemo(() => {
    const { isMiddleMessage, isLastMessage, isRecent } = recentMessage;

    if (isRecent && (isMiddleMessage || isLastMessage)) {
      return formatMessageDate(message.createdAt, 'h:mm a');
    }

    return formatMessageDate(message.createdAt);
  }, [recentMessage, message.createdAt]);

  const context = useMemo(
    () => ({
      message,
      formattedCreatedAt,
      recentMessage: recentMessage,
      isMyMessage,
      isEditing,
      setIsEditing,
      isOptimistic: !!optimisticMessageOpts,
      optimisticMessageOpts,
    }),
    [
      message,
      formattedCreatedAt,
      isMyMessage,
      isEditing,
      setIsEditing,
      optimisticMessageOpts,
      recentMessage,
    ]
  );

  return (
    <DiscussionMessageContext.Provider value={context}>
      {children}
    </DiscussionMessageContext.Provider>
  );
};

export const useDiscussionMessage = () => useContext(DiscussionMessageContext);
