import { useCallback, useEffect, useState, memo, useMemo } from 'react';
import { graphql, useMutation } from 'react-relay';
import { DiscussionOptimisticMessageMutation } from '../../../../../../__generated__/DiscussionOptimisticMessageMutation.graphql';
import {
  OptimisticMessagesStore,
  useStore,
} from '../../../utils/optimisticMessagesStore';
import { sharedUpdater } from '../../../hooks/useDiscussionMessagesSubscription';
import {
  Me,
  OptimisticDiscussionMessage,
  RecentMessages,
} from '../../../utils/messages';
import DiscussionMessage, { Props as DiscussionMessageProps } from '.';

const mutation = graphql`
  mutation DiscussionOptimisticMessageMutation(
    $input: SendDiscussionMessageInput!
  ) {
    sendDiscussionMessage(input: $input) {
      message {
        id
        content
        createdAt
        isEvent
        messageEvent
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
        pinnedBy {
          id
          name
        }
        parentMessage {
          id
          content
          createdBy {
            id
            name
            avatarUrl
            profileColor
          }
        }
      }
    }
  }
`;

interface Props extends Omit<DiscussionMessageProps, 'message'> {
  discussionId: string;
  message: OptimisticDiscussionMessage;
  me: Me;
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
      discussionId={discussionId}
      optimisticMessageOpts={opts}
      recentMessages={recentMessages}
    />
  );
};

export default memo(DiscussionOptimisticMessage);
