import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Virtuoso } from 'react-virtuoso';
import { Skeleton } from '@spout/toolkit';
import MessageDivider from './MessageDivider';
import Message from './Message';
import { generateItems, Item, Divider, group } from './utils/messages';
import { DiscussionMessagesQuery } from './__generated__/index.generated';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { OptimisticMessage as OptimisticMessageType } from './utils/messagesStore';
import { MeQuery } from './__generated__/MessageComposer.generated';
import OptimisticMessage from './OptimisticMessage';
import { useStore } from './utils/messagesStore';
import { UserInfoFragment } from '../../utils/fragments';

const isOptimistic = (message: Item) =>
  'optimisticId' in message && message.optimisticId < 0;

const isDivider = (item: Item) => 'type' in item && item.type === 'divider';

// Items to prepend should always be the page size but since
// we are not using GroupedVirtuoso, we need to account for the
// message dividers as well.
const getItemsToPrepend = (
  oldMessages: Props['messages'],
  newMessages: Props['messages']
) => {
  console.log('Calculating items to prepend...');
  const messagesToPrepend = newMessages.length;

  const oldDatesGrouped = group(oldMessages.map(({ node }) => node));
  const newDatesGrouped = group(newMessages.map(({ node }) => node));

  let dividersToPrepend = 0;
  for (const newDate in newDatesGrouped) {
    if (!oldDatesGrouped[newDate]) dividersToPrepend++;
  }

  console.log('Items to prepend: ', messagesToPrepend + dividersToPrepend);

  return messagesToPrepend + dividersToPrepend;
};

interface Props {
  discussionId: string;
  messages: { node: OptimisticMessageType | Message_Message }[];
  next(): Promise<DiscussionMessagesQuery | undefined>;
  hasNext?: boolean;
}

// TODO: Dates seem to be out of order slightly when more than one user
// is chatting. This might be because we are removing and updating cache
// at the same time in OptimisticMessage.tsx.
const MessageList = ({ discussionId, messages, hasNext, next }: Props) => {
  const { data } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `,
    { fetchPolicy: 'cache-only' }
  );

  const [firstItemIndex, setFirstItemIndex] = useState(1000000); //  (total of items to be loaded - the one we have already loaded).
  const [isFetching, setIsFetching] = useState(false);
  const timeoutRef = useRef(0);

  // NOTE: GroupedVirtuoso doesn't work very well with prepended items so that requires us
  // to create a flattened array of messages and message dividers.
  // Ideally, when GroupedVirtuoso supports prepended items, it will clean up a lot of this code.
  const items = useMemo(
    () => generateItems(messages.map((edge) => edge.node)),
    [messages]
  );

  const prependItems = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsFetching(true);

    timeoutRef.current = window.setTimeout(async () => {
      const oldMessages = [...messages];

      const data = await next();
      const itemsToPrepend = getItemsToPrepend(
        oldMessages,
        data?.discussionById.messages?.edges ?? []
      );
      setFirstItemIndex((firstItemIndex) => firstItemIndex - itemsToPrepend);
      setIsFetching(false);
      clearTimeout(timeoutRef.current);
    }, 500);

    return false;
  }, [next, messages]);

  const optimisticMessages =
    useStore((state) => state.messagesByDiscussionId[discussionId]) ?? [];

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  // TODO: Create a 'Jump to Present' footer.
  // TODO: Look into using ScrollSeekPlaceholder for performance improvement.
  return (
    <Virtuoso
      data={items}
      overscan={{ main: 200, reverse: 200 }}
      firstItemIndex={firstItemIndex}
      initialTopMostItemIndex={items.length - 1}
      startReached={hasNext ? prependItems : undefined}
      followOutput={(isAtBottom) => {
        const myMessages = optimisticMessages.some(
          (message) => message.createdBy.id === data!.me!.id
        );

        // If the user is scrolled away and sends a message - bring them to the bottom.
        if (myMessages) return 'auto';

        // A message from another user has been received - don't pull to bottom unless already there.
        return isAtBottom ? 'auto' : false;
      }}
      itemContent={(_, item) => {
        if (isDivider(item)) {
          return <MessageDivider date={(item as Divider).date} />;
        }

        return isOptimistic(item) ? (
          <OptimisticMessage
            key={(item as OptimisticMessageType).optimisticId}
            discussionId={discussionId}
            message={item as OptimisticMessageType}
          />
        ) : (
          <Message
            message={item as Message_Message}
            isLast={items.slice(-1).pop() === item}
          />
        );
      }}
      components={{
        Header: () =>
          isFetching ? (
            <div className="px-4 py-1">
              <Skeleton.Stack>
                <Skeleton h="h-3" w="w-1/2" />
                <Skeleton h="h-3" w="w-2/3" />
                <Skeleton h="h-3" w="w-5/6" />
              </Skeleton.Stack>
            </div>
          ) : null,
      }}
    />
  );
};

export default MessageList;
