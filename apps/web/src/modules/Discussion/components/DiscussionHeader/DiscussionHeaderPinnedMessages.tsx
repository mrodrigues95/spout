import { forwardRef, Fragment, Suspense, useMemo, useState } from 'react';
import {
  graphql,
  useFragment,
  useLazyLoadQuery,
  usePaginationFragment,
} from 'react-relay';
import { Components, Virtuoso } from 'react-virtuoso';
import { Popover, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { IconButton, Spinner, Text, Tooltip } from '@spout/toolkit';
import {
  MEDIA_QUERIES,
  useConnection,
  useMediaQuery,
} from '../../../../shared/hooks';
import {
  Avatar,
  EmptyFallback,
  ErrorBoundary,
  ErrorFallback,
} from '../../../../shared/components';
import { formatMessageDate } from '../../../../shared/utils';
import { DiscussionHeaderPinnedMessagesQuery } from './__generated__/DiscussionHeaderPinnedMessagesQuery.graphql';
import { DiscussionHeaderPinnedMessages_list$key } from './__generated__/DiscussionHeaderPinnedMessages_list.graphql';
import { DiscussionHeaderPinnedMessages_message$key } from './__generated__/DiscussionHeaderPinnedMessages_message.graphql';

interface DiscussionHeaderPinnedMessageProps {
  message: DiscussionHeaderPinnedMessages_message$key;
}

const DiscussionHeaderPinnedMessage = ({
  ...props
}: DiscussionHeaderPinnedMessageProps) => {
  const message = useFragment(
    graphql`
      fragment DiscussionHeaderPinnedMessages_message on Message {
        content
        createdAt
        pinnedAt
        createdBy {
          name
          avatarUrl
          profileColor
        }
      }
    `,
    props.message,
  );

  const formattedCreatedAt = useMemo(
    () => formatMessageDate(message.createdAt),
    [message.createdAt],
  );

  return (
    <div className="flex space-x-2 rounded-md p-3 shadow-md ring-1 ring-black ring-opacity-5">
      <div>
        <Avatar
          src={message.createdBy.avatarUrl}
          name={message.createdBy.name}
          profileColor={message.createdBy.profileColor}
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center space-x-2 pb-1">
          <Text as="span" size="sm" weight="semibold" color="dark">
            {message.createdBy.name}
          </Text>
          <Text as="span" size="xs" weight="medium" color="muted">
            {formattedCreatedAt}
          </Text>
        </div>
        <Text
          size="sm"
          weight="medium"
          color="dark"
          className="whitespace-pre-line break-words"
        >
          {message.content.trim()}
        </Text>
      </div>
    </div>
  );
};

interface DiscussionHeaderPinnedMessagesListProps {
  discussion: DiscussionHeaderPinnedMessages_list$key;
}

const DiscussionHeaderPinnedMessagesList = ({
  ...props
}: DiscussionHeaderPinnedMessagesListProps) => {
  const [listHeight, setListHeight] = useState(288); // 72rem.
  const { data, loadPrevious, hasPrevious, isLoadingPrevious } =
    usePaginationFragment(
      graphql`
        fragment DiscussionHeaderPinnedMessages_list on Discussion
        @argumentDefinitions(
          count: { type: "Int!" }
          cursor: { type: "String" }
        )
        @refetchable(
          queryName: "DiscussionHeaderPinnedMessagesListPaginationQuery"
        ) {
          messages(
            last: $count
            before: $cursor
            order: { pinnedAt: DESC }
            where: { pinnedAt: { neq: null } }
          )
            @connection(
              key: "DiscussionHeaderPinnedMessagesList_discussion_messages"
            ) {
            edges {
              node {
                ...DiscussionHeaderPinnedMessages_message
              }
            }
          }
        }
      `,
      props.discussion,
    );

  const messages = useConnection(data.messages);

  const components: Components = useMemo(
    () => ({
      Footer: () =>
        isLoadingPrevious ? (
          <Spinner
            className="py-4"
            variant="circle"
            size="sm"
            scheme="black"
            center
          />
        ) : null,
      Item: ({ children, ...props }) => (
        <li {...props} role="listitem" className="px-4 last:pb-3 odd:py-3">
          {children}
        </li>
      ),
      List: forwardRef(function List(props, ref) {
        return (
          <ol
            {...props}
            // @ts-ignore: `Virtuoso/List` interface is not polymorphic and expects a `div`.
            ref={ref}
            role="list"
          />
        );
      }) as Components['List'],
    }),
    [isLoadingPrevious],
  );

  if (!messages.length) {
    return (
      <EmptyFallback
        icon={<FontAwesomeIcon icon={faCommentSlash} size="2x" />}
        className="my-8"
      />
    );
  }

  return (
    <Virtuoso
      data={messages}
      endReached={hasPrevious ? () => loadPrevious(10) : undefined}
      itemContent={(_, message) => (
        <DiscussionHeaderPinnedMessage message={message} />
      )}
      increaseViewportBy={{ top: 200, bottom: 200 }}
      totalCount={messages.length}
      className="max-h-96 overflow-x-hidden"
      style={{ height: listHeight }}
      totalListHeightChanged={setListHeight}
      components={components}
    />
  );
};

interface DiscussionHeaderPinnedMessagesProps {
  fetchKey: number;
}

const DiscussionHeaderPinnedMessages = ({
  fetchKey,
}: DiscussionHeaderPinnedMessagesProps) => {
  const router = useRouter();
  const data = useLazyLoadQuery<DiscussionHeaderPinnedMessagesQuery>(
    graphql`
      query DiscussionHeaderPinnedMessagesQuery(
        $id: ID!
        $count: Int!
        $cursor: String
      ) {
        discussionById(id: $id) {
          ...DiscussionHeaderPinnedMessages_list
            @arguments(count: $count, cursor: $cursor)
        }
      }
    `,
    {
      id: router.query.discussionId as string,
      count: 10,
    },
    { fetchPolicy: 'store-and-network', fetchKey },
  );

  return (
    <DiscussionHeaderPinnedMessagesList discussion={data.discussionById} />
  );
};

const DiscussionHeaderPinnedMessagesPopover = () => {
  const isDesktop = useMediaQuery(MEDIA_QUERIES.XL);

  // TODO: Position this with `usePopper` and use a portal.
  return (
    <Popover className="hidden lg:block">
      {({ open }) => (
        <>
          <Tooltip
            label="Pinned Messages"
            placement="bottom"
            isOpen={open ? false : undefined}
          >
            <Popover.Button
              as={IconButton}
              icon={
                <FontAwesomeIcon
                  icon={faThumbtack}
                  className="rotate-45 transform"
                />
              }
              aria-label="Show pinned messages"
              size={isDesktop ? 'md' : 'sm'}
              variant="tertiary"
            />
          </Tooltip>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-50 mt-3 w-[28rem] translate-x-[-91%] transform rounded-lg bg-white shadow-lg">
              <div className="flex h-full flex-1 flex-col rounded-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-gray-100 p-4">
                  <Text className="text-gray-900" weight="semibold">
                    Pinned Messages
                  </Text>
                </div>
                <div className="flex flex-1 flex-col">
                  <ErrorBoundary
                    FallbackComponent={({ resetErrorBoundary }) => (
                      <ErrorFallback
                        heading="We couldn't load any pinned messages."
                        action={resetErrorBoundary}
                        className="my-8"
                      />
                    )}
                  >
                    {({ fetchKey }) => (
                      <Suspense
                        fallback={
                          <Spinner center size="lg" className="flex-1" />
                        }
                      >
                        <DiscussionHeaderPinnedMessages fetchKey={fetchKey} />
                      </Suspense>
                    )}
                  </ErrorBoundary>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DiscussionHeaderPinnedMessagesPopover;
