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
import { Attachments } from './Attachments';
import TextArea from '../../../../../../shared/components/ui/TextArea';
import ComposerToolbar from './ComposerToolbar';
import { ComposerToolbarProvider } from './ComposerToolbarProvider';
import { DiscussionMessageComposer_discussion$key } from './__generated__/DiscussionMessageComposer_discussion.graphql';
import { DiscussionMessageComposer_user$key } from './__generated__/DiscussionMessageComposer_user.graphql';

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

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If the user wants to enter a new line, they must use SHIFT+ENTER.
    if (e.target.value !== '\n') setMessage(e.target.value);
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
        'flex items-center justify-between h-full p-3 pointer-events-auto bg-white border-2 rounded-md transition ease-in-out duration-150',
        focused ? 'border-transparent ring-2 ring-black' : 'border-gray-200'
      )}
    >
      <div className="flex flex-col w-full space-y-3">
        <TextArea
          placeholder={`Message #${discussion.name.trim()}`}
          value={message}
          aria-label="Enter message"
          onChange={handleOnChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyPress={handleKeyPress}
          className="p-0"
          maxRows={5}
        />
        <Attachments
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
