import { useCallback, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { FileRejection } from 'react-dropzone';
import clsx from 'clsx';
import { formatNewMessage } from '../../../utils/format';
import { FileWithId } from '../../../hooks';
import {
  OptimisticMessagesStore,
  useStore,
} from '../../../utils/optimisticMessagesStore';
import { ComposerAttachments } from './ComposerAttachments';
import TextArea from '../../../../../../shared/components/ui/TextArea';
import ComposerToolbar from './ComposerToolbar';
import { ComposerToolbarProvider } from './ComposerToolbarProvider';
import { DiscussionMessageComposer_discussion$key } from '../../../../../../__generated__/DiscussionMessageComposer_discussion.graphql';
import { DiscussionMessageComposer_user$key } from '../../../../../../__generated__/DiscussionMessageComposer_user.graphql';

const discussionFragment = graphql`
  fragment DiscussionMessageComposer_discussion on Discussion {
    id
    name
  }
`;

const meFragment = graphql`
  fragment DiscussionMessageComposer_user on User {
    id
    name
    avatarUrl
    profileColor
  }
`;

const selector = (state: OptimisticMessagesStore) => state.add;

interface Props {
  discussion: DiscussionMessageComposer_discussion$key;
  user: DiscussionMessageComposer_user$key;
}

const DiscussionMessageComposer = ({ ...props }: Props) => {
  const discussion = useFragment(discussionFragment, props.discussion);
  const me = useFragment(meFragment, props.user);

  const add = useStore(selector);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [shouldClearFiles, setShouldClearFiles] = useState(false);
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const onNewMessage = useCallback(() => {
    if (isUploadingFiles) return;
    if (!message.trim().length) return;

    add(discussion.id, {
      content: formatNewMessage(message.trim()),
      attachmentIds: uploadedFiles.map((f) => f.id!),
      createdBy: me,
    });
    setMessage('');
    setShouldClearFiles(true);
  }, [isUploadingFiles, message, add, discussion.id, uploadedFiles, me]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onNewMessage();
    }
  };

  const onFilesAccepted = useCallback(
    (files: File[]) => setAcceptedFiles(files),
    []
  );

  const onFilesRejected = useCallback(
    (files: FileRejection[]) => setRejectedFiles(files),
    []
  );

  return (
    <div
      className={clsx(
        'pointer-events-auto flex h-full items-center justify-between rounded-md border-2 bg-white p-3 transition duration-150 ease-in-out',
        focused ? 'border-transparent ring-2 ring-black' : 'border-gray-200'
      )}
    >
      <div className="flex w-full flex-col space-y-3">
        <TextArea
          placeholder={`Message #${discussion.name.trim()}`}
          value={message}
          aria-label="Enter message"
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyPress={handleKeyPress}
          className="p-0"
          maxRows={5}
        />
        <ComposerAttachments
          acceptedFiles={acceptedFiles}
          rejectedFiles={rejectedFiles}
          shouldClearFiles={shouldClearFiles}
          setIsUploadingFiles={setIsUploadingFiles}
          setUploadedFiles={setUploadedFiles}
          setShouldClearFiles={setShouldClearFiles}
        />
        <ComposerToolbarProvider
          message={message}
          isUploadingFiles={isUploadingFiles}
          onNewMessage={onNewMessage}
          onFilesAccepted={onFilesAccepted}
          onFilesRejected={onFilesRejected}
        >
          <ComposerToolbar />
        </ComposerToolbarProvider>
      </div>
    </div>
  );
};

export default DiscussionMessageComposer;
