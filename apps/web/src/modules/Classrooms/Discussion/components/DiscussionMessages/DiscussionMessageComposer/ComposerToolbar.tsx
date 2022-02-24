import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faLaughSquint } from '@fortawesome/free-regular-svg-icons';
import { IconButton, Spinner, Tooltip } from '@spout/toolkit';
import { UploadAttachments } from './ComposerAttachments';
import { useComposerToolbar } from './ComposerToolbarProvider';

const ComposerToolbar = () => {
  const { onNewMessage, message, isUploadingFiles } = useComposerToolbar()!;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-1">
        <Tooltip label="View Emojis">
          <IconButton
            icon={<FontAwesomeIcon icon={faLaughSquint} />}
            aria-label="View Emojis"
          />
        </Tooltip>
        <UploadAttachments />
      </div>
      <IconButton
        icon={
          isUploadingFiles ? (
            <Spinner variant="circle" size="sm" scheme="white" />
          ) : (
            <FontAwesomeIcon icon={faPaperPlane} />
          )
        }
        aria-label="Send message"
        onClick={onNewMessage}
        variant="solid"
        scheme="orange"
        disabled={!message.raw || isUploadingFiles}
        className="rounded-full"
      />
    </div>
  );
};

export default ComposerToolbar;
