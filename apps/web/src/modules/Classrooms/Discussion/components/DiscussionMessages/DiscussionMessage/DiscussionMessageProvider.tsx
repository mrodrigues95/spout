import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { formatMessageDate } from '../../../utils/dates';
import {
  DiscussionMessage,
  Me,
  RecentMessage,
  RecentMessages,
} from '../../../utils/messages';
import {
  useEditDiscussionMessage,
  EditFn,
  useUnpinDiscussionMessage,
  UnpinFn,
  PinFn,
  usePinDiscussionMessage,
} from './hooks';

interface OptimisticMessageOptions {
  loading: boolean;
  retry(): void;
  hasError: boolean;
}

interface DiscussionMessageData {
  message: DiscussionMessage;
  me: Me;
  discussionId: string;
  formattedCreatedAt: string;
  isOptimistic: boolean;
  isPinned: boolean;
  isMyMessage: boolean;
  recentMessage: RecentMessage;
  optimisticMessageOpts?: OptimisticMessageOptions;
}

interface DiscussionMessageActions {
  edit: EditFn;
  unpin: UnpinFn;
  pin: PinFn;
}

interface DiscussionMessageState {
  isEditing: boolean;
  setIsEditing(val: boolean): void;
}

interface TDiscussionMessageContext {
  data: DiscussionMessageData;
  actions: DiscussionMessageActions;
  state: DiscussionMessageState;
}

const DiscussionMessageContext = createContext<TDiscussionMessageContext | null>(
  null
);

export interface Props
  extends Pick<
    TDiscussionMessageContext['data'],
    'message' | 'isMyMessage' | 'optimisticMessageOpts' | 'me' | 'discussionId'
  > {
  recentMessages?: RecentMessages;
  children: ReactNode;
}

export const DiscussionMessageProvider = ({
  message,
  me,
  discussionId,
  recentMessages,
  isMyMessage,
  optimisticMessageOpts,
  children,
}: Props) => {
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

  const data: DiscussionMessageData = useMemo(
    () => ({
      message,
      me,
      discussionId,
      formattedCreatedAt,
      recentMessage: recentMessage,
      isPinned: !!message.pinnedBy,
      isMyMessage,
      isOptimistic: !!optimisticMessageOpts,
      optimisticMessageOpts,
    }),
    [
      formattedCreatedAt,
      isMyMessage,
      me,
      message,
      discussionId,
      optimisticMessageOpts,
      recentMessage,
    ]
  );

  const [isEditing, setIsEditing] = useState(false);

  const state: DiscussionMessageState = useMemo(
    () => ({ isEditing, setIsEditing }),
    [isEditing]
  );

  const { edit } = useEditDiscussionMessage(message);
  const { unpin } = useUnpinDiscussionMessage(message, me);
  const { pin } = usePinDiscussionMessage(message, me);

  const actions: DiscussionMessageActions = useMemo(
    () => ({ edit, unpin, pin }),
    [edit, unpin, pin]
  );

  const context = useMemo(
    () => ({
      data,
      actions,
      state,
    }),
    [data, actions, state]
  );

  return (
    <DiscussionMessageContext.Provider value={context}>
      {children}
    </DiscussionMessageContext.Provider>
  );
};

export const useDiscussionMessage = () => useContext(DiscussionMessageContext);
