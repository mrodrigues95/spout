import { useCallback, useRef, useState } from 'react';
import { graphql, useFragment } from 'react-relay';
import { FileRejection } from 'react-dropzone';
import { useEditor, EditorContent, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { formatNewMessage } from '../../../utils/format';
import { FileWithId } from '../../../hooks';
import {
  OptimisticMessagesStore,
  useStore,
} from '../../../utils/optimisticMessagesStore';
import { ComposerAttachments } from './ComposerAttachments';
import ComposerToolbar from './ComposerToolbar';
import { ComposerToolbarProvider } from './ComposerToolbarProvider';
import { DiscussionMessageComposer_discussion$key } from '../../../../../../__generated__/DiscussionMessageComposer_discussion.graphql';
import { DiscussionMessageComposer_user$key } from '../../../../../../__generated__/DiscussionMessageComposer_user.graphql';
import { useEffect } from 'react';

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
  const [shouldSubmitMessage, setShouldSubmitMessage] = useState(false);
  const [focused, setFocused] = useState(false);

  const messageRef = useRef({ raw: '', html: '' });

  const editor = useEditor({
    autofocus: true,
    extensions: [
      StarterKit,
      Extension.create({
        addKeyboardShortcuts: () => {
          return {
            // Overwrite the default 'Enter' behaviour.
            Enter: () => {
              setShouldSubmitMessage(true);
              return true;
            },
          };
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none',
      },
      handleDOMEvents: {
        focusin: () => {
          setFocused(true);
          return false;
        },
        focusout: () => {
          setFocused(false);
          return false;
        },
      },
    },
    onUpdate: ({ editor }) => {
      messageRef.current = { raw: editor.getText(), html: editor.getHTML() };
    },
  });

  const onNewMessage = useCallback(() => {
    const { raw, html } = messageRef.current;
    if (isUploadingFiles) return;
    if (!raw.length) return;

    add(discussion.id, {
      content: formatNewMessage(html),
      attachmentIds: uploadedFiles.map((f) => f.id!),
      createdBy: me,
    });
    editor?.commands.clearContent(true);
    setShouldClearFiles(true);
  }, [
    isUploadingFiles,
    messageRef,
    editor,
    add,
    discussion.id,
    uploadedFiles,
    me,
  ]);

  useEffect(() => {
    if (shouldSubmitMessage) {
      onNewMessage();
      setShouldSubmitMessage(false);
    }
  }, [shouldSubmitMessage, editor, onNewMessage]);

  const onFilesAccepted = useCallback(
    (files: File[]) => setAcceptedFiles(files),
    [],
  );

  const onFilesRejected = useCallback(
    (files: FileRejection[]) => setRejectedFiles(files),
    [],
  );

  return (
    <div
      className={clsx(
        'pointer-events-auto flex h-full items-center justify-between rounded-md border-2 bg-white p-3 transition duration-150 ease-in-out',
        focused ? 'border-transparent ring-2 ring-black' : 'border-gray-200',
      )}
    >
      <div className="flex w-full flex-col space-y-3">
        <EditorContent editor={editor} className="max-h-60 overflow-auto" />
        <ComposerAttachments
          acceptedFiles={acceptedFiles}
          rejectedFiles={rejectedFiles}
          shouldClearFiles={shouldClearFiles}
          setIsUploadingFiles={setIsUploadingFiles}
          setUploadedFiles={setUploadedFiles}
          setShouldClearFiles={setShouldClearFiles}
        />
        <ComposerToolbarProvider
          message={messageRef.current}
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
