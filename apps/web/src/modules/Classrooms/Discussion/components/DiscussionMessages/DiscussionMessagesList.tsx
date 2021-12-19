import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
  ReactElement,
} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Virtuoso } from 'react-virtuoso';
import { Skeleton } from '@spout/toolkit';
import { DiscussionQuery } from '../__generated__/Discussion.generated';
import { Message_Message } from '../../utils/__generated__/fragments.generated';
import { generateItems, Item, Divider, group } from '../../utils/messages';
import {
  OptimisticMessage as OptimisticMessageType,
  useStore,
} from '../../utils/messagesStore';
import { MeQuery } from './__generated__/DiscussionMessagesList.generated';
import { UserInfoFragment } from '../../utils/fragments';
import { Card } from '../../../../../shared/components';
import OptimisticMessage from './DiscussionOptimisticMessage';
import MessageDivider from './DiscussionMessageDivider';
import Message from './DiscussionMessage';
import clsx from 'clsx';

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

const START_INDEX = 1000000;

interface Props {
  discussionId: string;
  messages: { node: OptimisticMessageType | Message_Message }[];
  next(): Promise<DiscussionQuery | null>;
  hasNext?: boolean;
  header: ReactElement;
}

// TODO: Dates seem to be out of order slightly when more than one user
// is chatting. This might be because we are removing and updating cache
// at the same time in OptimisticMessage.tsx.
const DiscussionMessagesList = ({
  discussionId,
  messages,
  hasNext,
  next,
  header,
}: Props) => {
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

  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX); //  (total of items to be loaded - the one we have already loaded).
  const [isFetching, setIsFetching] = useState(false);
  const timeoutRef = useRef(0);

  // NOTE: GroupedVirtuoso doesn't work very well with prepended items so that requires us
  // to create a flattened array of messages and message dividers.
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
          <Message message={item as Message_Message} />
        );
      }}
      components={{
        Header: () =>
          isFetching ? (
            <div className="px-4 py-6">
              <Card className="p-3 flex w-full rounded-md shadow-sm bg-white ring-1 ring-gray-900/5 space-x-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <Skeleton.Stack className="flex-1">
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                  <Skeleton className="h-3 w-5/6" />
                </Skeleton.Stack>
              </Card>
            </div>
          ) : (
            header
          ),
        Footer: () => <div className="pt-6" />,
        ScrollSeekPlaceholder: ({ height }) => {
          const isDivider = height <= 45;

          return (
            <div
              className={clsx(
                'flex items-start px-4',
                isDivider ? 'py-0' : 'py-6'
              )}
              style={{ height }}
            >
              {isDivider ? (
                <MessageDivider.Skeleton />
              ) : (
                <>
                  <Skeleton className="h-10 w-10 rounded-full mr-2" />
                  <Skeleton className="h-full w-1/2" />
                </>
              )}
            </div>
          );
        },
      }}
      scrollSeekConfiguration={{
        enter: (velocity) => Math.abs(velocity) > 1500,
        exit: (velocity) => Math.abs(velocity) < 100,
      }}
    />
  );
};

export default DiscussionMessagesList;
