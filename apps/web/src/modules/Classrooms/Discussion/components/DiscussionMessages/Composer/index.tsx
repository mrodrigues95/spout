import { createContext, useCallback, useState } from 'react';
import { FileRejection } from 'react-dropzone';
import { gql, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { FilePickerProps } from '@spout/toolkit';
import { formatNewMessage } from '../../../utils/format';
import { FileWithId } from '../../../hooks';
import { UserInfoFragment } from '../../../utils/fragments';
import { useStore } from '../../../utils/messagesStore';
import { MeQuery } from './__generated__/index.generated';
import { DiscussionQuery } from '../../__generated__/Discussion.generated';
import { Attachments } from './Attachments';
import TextArea from '../../../../../../shared/components/ui/TextArea';
import ComposerToolbar from './ComposerToolbar';

interface ComposerContextType {
  message: string;
  isUploadingFiles: boolean;
  onNewMessage: () => void;
  onFilesAccepted: FilePickerProps['onDropAccepted'];
  onFilesRejected: FilePickerProps['onDropRejected'];
}

export const ComposerContext = createContext<ComposerContextType | null>(null);

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const Composer = ({ discussion }: Props) => {
  const { data } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `
  );
  const add = useStore((state) => state.add);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileWithId[]>([]);
  const [isUploadingFiles, setIsUploadingFiles] = useState(false);
  const [shouldClearFiles, setShouldClearFiles] = useState(false);
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);

  const onNewMessage = () => {
    if (isUploadingFiles) return;

    if (message.trim().length) {
      add(
        discussion.id,
        formatNewMessage(message.trim()),
        uploadedFiles,
        data!.me!
      );
      setMessage('');
      setShouldClearFiles(true);
    }
  };

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
        <ComposerContext.Provider
          value={{
            message,
            isUploadingFiles,
            onNewMessage,
            onFilesAccepted,
            onFilesRejected,
          }}
        >
          <ComposerToolbar />
        </ComposerContext.Provider>
      </div>
    </div>
  );
};

export default Composer;
