import { useCallback, useEffect, useState, memo, useMemo } from 'react';
import { graphql, useMutation } from 'react-relay';
import {
  OptimisticMessagesStore,
  useStore,
} from '../../../utils/optimisticMessagesStore';
import { sharedUpdater } from '../../../hooks/useDiscussionMessagesSubscription';
import {
  OptimisticDiscussionMessage,
  RecentMessages,
} from '../../../utils/messages';
import { DiscussionOptimisticMessageMutation } from './__generated__/DiscussionOptimisticMessageMutation.graphql';
import DiscussionMessage from '.';

const mutation = graphql`
  mutation DiscussionOptimisticMessageMutation(
    $input: SendDiscussionMessageInput!
  ) {
    sendDiscussionMessage(input: $input) {
      message {
        id
        content
        createdAt
        isDiscussionEvent
        discussionEvent
        attachments {
          id
          location
          name
          contentLength
          extension
        }
        createdBy {
          id
          name
          avatarUrl
          profileColor
        }
      }
    }
  }
`;

interface Props {
  discussionId: string;
  message: OptimisticDiscussionMessage;
  me: { id: string };
  recentMessages?: RecentMessages;
}

const selector = (state: OptimisticMessagesStore) => ({
  remove: state.remove,
  markIsSent: state.markIsSent,
});

const DiscussionOptimisticMessage = ({
  discussionId,
  message,
  me,
  recentMessages,
}: Props) => {
  const [hasError, setHasError] = useState(false);
  const { remove } = useStore(selector);
  const [sendMessage, isInFlight] =
    useMutation<DiscussionOptimisticMessageMutation>(mutation);

  const send = useCallback(() => {
    sendMessage({
      variables: {
        input: {
          discussionId,
          content: message.content,
          fileIds: message.attachmentIds,
        },
      },
      onCompleted: () => remove(discussionId, message.optimisticId!),
      onError: () => setHasError(true),
      updater: (store) => {
        const message = store
          .getRootField('sendDiscussionMessage')
          .getLinkedRecord('message');

        sharedUpdater(store, discussionId, message);
      },
    });
  }, [discussionId, message, remove, sendMessage]);

  useEffect(() => {
    // Fire the mutation as soon as this component is rendered.
    send();
  }, [send]);

  const opts = useMemo(
    () => ({ hasError, loading: isInFlight, retry: send }),
    [hasError, isInFlight, send],
  );

  return (
    <DiscussionMessage
      message={{ ...message, attachments: [] }}
      me={me}
      optimisticMessageOpts={opts}
      recentMessages={recentMessages}
    />
  );
};

export default memo(DiscussionOptimisticMessage);
