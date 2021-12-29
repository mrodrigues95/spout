import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  FileRejection,
  ErrorCode as DropzoneErrorCode,
} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPaperclip,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  buttonOrLinkStyles,
  FilePicker,
  iconButtonStyles,
  Spinner,
  Tooltip,
  FileIcon,
  FILE_EXTENSIONS,
  Modal,
  Button,
} from '@spout/toolkit';
import clsx from 'clsx';
import {
  FileUploadQueue,
  FileWithId,
  useFileUploadQueue,
} from '../../../hooks';
import { ComposerContext } from '.';
import {
  formatBytesToHumanReadable,
  getAcceptedFileExtensions,
  getFileExtensionFromContentType,
  MAX_FILES_PER_UPLOAD,
  MAX_FILE_SIZE,
  MIN_FILE_SIZE,
} from '../../../../../../shared/utils';

export const UploadAttachments = () => {
  const { onFilesAccepted, onFilesRejected } = useContext(ComposerContext)!;

  return (
    <FilePicker
      accept={[...getAcceptedFileExtensions()]}
      onDropAccepted={onFilesAccepted}
      onDropRejected={onFilesRejected}
      minSize={MIN_FILE_SIZE}
      maxSize={MAX_FILE_SIZE}
      maxFiles={MAX_FILES_PER_UPLOAD}
    >
      <Tooltip label="Upload Attachments">
        <FilePicker.Button
          className={clsx(
            buttonOrLinkStyles.base,
            buttonOrLinkStyles.disabled,
            buttonOrLinkStyles.active,
            buttonOrLinkStyles.variant['ghost'],
            buttonOrLinkStyles.scheme['gray']['ghost'],
            iconButtonStyles.size['sm']
          )}
          aria-label="Select attachments to upload"
        >
          <FontAwesomeIcon icon={faPaperclip} />
        </FilePicker.Button>
      </Tooltip>
    </FilePicker>
  );
};

const getIcon = ({
  isQueued,
  isError,
  isUploading,
  isUploaded,
  isFocused,
}: Omit<FileUploadQueue, 'file' | 'id'> & { isFocused: boolean }) => {
  if (isUploading || isQueued) return <Spinner variant="circle" size="sm" />;
  if (isFocused) return <FontAwesomeIcon icon={faTrashAlt} />;
  if (isError) return <FontAwesomeIcon icon={faTimesCircle} />;
  if (isUploaded) return <FontAwesomeIcon icon={faCheckCircle} />;
  return null;
};

interface AttachmentProps extends FileUploadQueue {
  removeFromQueue: ReturnType<typeof useFileUploadQueue>['removeFromQueue'];
}

const Attachment = ({
  id,
  file,
  isQueued,
  isError,
  isUploaded,
  isUploading,
  removeFromQueue,
}: AttachmentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const icon = getIcon({
    isQueued,
    isError,
    isUploaded,
    isUploading,
    isFocused,
  });

  const fileExtension = getFileExtensionFromContentType(file.type);

  return (
    <li className="relative flex w-48 p-3 rounded-md shadow-md ring-1 ring-gray-900/10">
      <div className="inline-flex absolute -top-1.5 -right-1.5 bg-white">
        <Tooltip
          label="Remove File"
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
        >
          <button
            type="button"
            aria-label="Remove File"
            disabled={isQueued || isUploading}
            onClick={() => removeFromQueue(id, file.id)}
            className={clsx(
              'inline-flex items-center justify-center z-10 rounded-sm shadow-lg',
              'transition duration-150 ease-in-out',
              'focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white focus:ring-current',
              'disabled:pointer-events-none disabled:opacity-70',
              isFocused || isError
                ? 'text-red-700'
                : isUploaded
                ? 'text-green-700'
                : null
            )}
          >
            {icon}
          </button>
        </Tooltip>
      </div>
      <FileIcon
        ext={fileExtension?.toLowerCase() as keyof typeof FILE_EXTENSIONS}
        className="text-3xl mt-1.5 mr-2"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{file.name}</p>
        <p className="text-gray-500 truncate text-sm">
          {formatBytesToHumanReadable(file.size)} - {fileExtension}
        </p>
      </div>
    </li>
  );
};

enum ServerErrorCode {
  ServerError = 'error-uploading-file-to-api',
}

type FileUploadErrorCode = DropzoneErrorCode | ServerErrorCode | string;

const getErrorMessageFromErrorCode = (code?: FileUploadErrorCode) => {
  if (!code) return null;

  switch (code) {
    case DropzoneErrorCode.FileInvalidType:
      return 'Unsupported file type';
    case DropzoneErrorCode.FileTooSmall:
      return 'Attachment is too small - must be greater than 0 bytes';
    case DropzoneErrorCode.FileTooLarge:
      return 'Attachment is too large - must be less than 8MB';
    case DropzoneErrorCode.TooManyFiles:
      return 'Too many attachments - a maximum of 10 attachments can only be uploaded at once';
    case ServerErrorCode.ServerError:
      return 'Server error - please try again';
    default:
      throw new Error('Unhandled error code');
  }
};

interface RejectedOrErrorAttachmentProps extends Omit<FileRejection, 'errors'> {
  errors: { message: string; code: FileUploadErrorCode }[];
}

const RejectedOrErrorAttachment = ({
  file,
  errors,
}: RejectedOrErrorAttachmentProps) => {
  console.log(file.type);
  const fileExtension = getFileExtensionFromContentType(file.type);

  // A file can have more than one error but we only display the first one.
  const errorMessage = getErrorMessageFromErrorCode(errors[0]?.code);

  return (
    <li className="relative flex p-3 rounded-md shadow-sm ring-1 ring-gray-900/10">
      <FileIcon
        ext={fileExtension?.toLowerCase() as keyof typeof FILE_EXTENSIONS}
        className="text-3xl mt-1.5 mr-2"
      />
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{file.name}</p>
        <p className="text-gray-500 truncate text-sm">
          {formatBytesToHumanReadable(file.size)} - {fileExtension}
        </p>
        {errorMessage && (
          <p className="text-sm font-medium text-red-600">{errorMessage}</p>
        )}
      </div>
    </li>
  );
};

interface AttachmentsProps {
  acceptedFiles: File[];
  rejectedFiles: FileRejection[];
  setIsUploadingFiles: (value: boolean) => void;
  setUploadedFiles: (files: FileWithId[]) => void;
  shouldClearFiles: boolean;
  setShouldClearFiles: (value: boolean) => void;
}

export const Attachments = ({
  acceptedFiles,
  rejectedFiles: _rejectedFiles,
  setIsUploadingFiles,
  setUploadedFiles,
  setShouldClearFiles,
  shouldClearFiles = false,
}: AttachmentsProps) => {
  const { upload, queue, removeFromQueue, resetQueue } = useFileUploadQueue();
  const [isOpen, setIsOpen] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState(_rejectedFiles);
  const [errorFiles, setErrorFiles] = useState<FileRejection[]>([]);

  useEffect(() => setRejectedFiles(_rejectedFiles), [_rejectedFiles]);

  useEffect(() => {
    const errors = queue.errorFiles.map((errorFile) => ({
      file: errorFile,
      errors: [{ message: 'Server error', code: ServerErrorCode.ServerError }],
    }));

    setErrorFiles(errors);
  }, [queue.errorFiles]);

  const rejectedOrErrorAttachments = useMemo(
    () => [...rejectedFiles, ...errorFiles],
    [rejectedFiles, errorFiles]
  );

  useEffect(() => {
    upload(acceptedFiles);
  }, [upload, acceptedFiles]);

  useEffect(() => {
    // Show the modal when the user selects invalid files and/or
    // one of there uploads fails.
    if (rejectedFiles.length || (!queue.isInFlight && errorFiles.length)) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [queue.isInFlight, errorFiles, rejectedFiles]);

  useEffect(() => {
    if (queue.isInFlight) {
      setIsUploadingFiles(true);
    } else {
      setIsUploadingFiles(false);
      setUploadedFiles(queue.uploadedFiles);
    }
  }, [
    queue.isInFlight,
    queue.uploadedFiles,
    setIsUploadingFiles,
    setUploadedFiles,
  ]);

  useEffect(() => {
    // TODO: Can probably remove this once we use a form.
    if (shouldClearFiles) {
      resetQueue();
      setShouldClearFiles(false);
    }
  }, [shouldClearFiles, resetQueue, setShouldClearFiles]);

  const onClose = useCallback(() => {
    setIsOpen(false);

    // Reset error state so that the modal is only shown once per transaction.
    setErrorFiles([]);
    setRejectedFiles([]);
  }, []);

  const files = useMemo(
    () => [...queue.files.sort((a, b) => (a.id > b.id ? 1 : -1))],
    [queue.files]
  );

  // TODO: Get image/video previews working.
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Upload failed"
            description="Sorry, there was a problem while uploading some of your attachment(s)"
            dismiss
          />
          <Modal.Body className="max-h-80">
            <ul className="space-y-3 h-full p-2 overflow-y-auto overflow-x-hidden">
              {rejectedOrErrorAttachments.map((rejectedAttachment) => (
                <RejectedOrErrorAttachment
                  key={`${
                    rejectedAttachment.file.name
                  }-${rejectedAttachment.file.size.toString()}`}
                  {...rejectedAttachment}
                />
              ))}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button className="uppercase" onClick={onClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {!!files.length && (
        <ul className="flex flex-wrap py-2 gap-3" role="list">
          {files.map((file) => (
            <Attachment
              key={file.id}
              removeFromQueue={removeFromQueue}
              {...file}
            />
          ))}
        </ul>
      )}
    </>
  );
};
