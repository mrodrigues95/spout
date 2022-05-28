import { useCallback, useEffect, useMemo, useState } from 'react';
import { FileRejection, ErrorCode as DropzoneErrorCode } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faPaperclip,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
  getButtonStyles,
  FilePicker,
  Spinner,
  Tooltip,
  FileIcon,
  Modal,
  Button,
  getFileExtensionFromFileName,
} from '@spout/toolkit';
import clsx from 'clsx';
import {
  formatBytesToHumanReadable,
  getErrorMessageFromErrorCode,
  MAX_FILES_PER_UPLOAD,
  MAX_FILE_SIZE,
  MIN_FILE_SIZE,
} from '../../../../../shared/utils';
import {
  FileUploadErrorCode,
  ActionType as FileUploadActionType,
  MultiFileUploadEntry,
  FileWithId,
  useMultiFileUpload,
} from '../../../../../shared/hooks';
import { useComposerToolbar } from './ComposerToolbarProvider';

export const UploadAttachments = () => {
  const { onFilesAccepted, onFilesRejected } = useComposerToolbar()!;

  const styles = getButtonStyles();

  return (
    <FilePicker
      onDropAccepted={onFilesAccepted}
      onDropRejected={onFilesRejected}
      minSize={MIN_FILE_SIZE}
      maxSize={MAX_FILE_SIZE}
      maxFiles={MAX_FILES_PER_UPLOAD}
    >
      <Tooltip label="Upload Attachments">
        <FilePicker.Button
          className={clsx(
            styles.base,
            styles.disabled,
            styles.active,
            styles.variant.tertiary,
            styles.size.icon.sm,
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
  isError,
  isUploading,
  isUploaded,
  isFocused,
}: Omit<MultiFileUploadEntry, 'file' | 'id'> & { isFocused: boolean }) => {
  if (isUploading) return <Spinner variant="circle" size="sm" />;
  if (isFocused) return <FontAwesomeIcon icon={faTrashAlt} />;
  if (isError) return <FontAwesomeIcon icon={faTimesCircle} />;
  if (isUploaded) return <FontAwesomeIcon icon={faCheckCircle} />;
  return null;
};

interface ComposerAttachmentProps extends MultiFileUploadEntry {
  removeFileEntry: ReturnType<typeof useMultiFileUpload>['removeFileEntry'];
}

const ComposerAttachment = ({
  id,
  file,
  isError,
  isUploaded,
  isUploading,
  removeFileEntry,
}: ComposerAttachmentProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const icon = getIcon({
    isError,
    isUploaded,
    isUploading,
    isFocused,
  });

  const fileExtension = getFileExtensionFromFileName(file.name).toKey();

  return (
    <li className="relative flex w-48 rounded-md p-3 shadow-md ring-1 ring-gray-900/10">
      <div className="absolute -top-1.5 -right-1.5 inline-flex bg-white">
        <Tooltip
          label="Remove File"
          onOpen={() => setIsFocused(true)}
          onClose={() => setIsFocused(false)}
        >
          <button
            type="button"
            aria-label="Remove File"
            disabled={isUploading}
            onClick={() =>
              removeFileEntry(id, { delete: true, fileId: file.id })
            }
            className={clsx(
              'z-10 inline-flex items-center justify-center rounded-sm shadow-lg',
              'transition duration-150 ease-in-out',
              'focus:outline-none focus:ring focus:ring-current focus:ring-offset-2 focus:ring-offset-white',
              'disabled:pointer-events-none disabled:opacity-70',
              isFocused || isError
                ? 'text-red-700'
                : isUploaded
                ? 'text-emerald-700'
                : null,
            )}
          >
            {icon}
          </button>
        </Tooltip>
      </div>
      <FileIcon
        ext={fileExtension}
        size="lg"
        containerProps={{ className: 'mt-1.5 mr-2' }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{file.name}</p>
        <p className="truncate text-sm text-gray-500">
          {formatBytesToHumanReadable(file.size)}
        </p>
      </div>
    </li>
  );
};

interface RejectedOrErrorAttachmentProps {
  attachment: File;
  errorCode: DropzoneErrorCode | FileUploadErrorCode | string;
}

const RejectedOrErrorAttachment = ({
  attachment,
  errorCode,
}: RejectedOrErrorAttachmentProps) => {
  const errorMessage = getErrorMessageFromErrorCode(errorCode);
  const fileExtension = getFileExtensionFromFileName(attachment.name).toKey();

  return (
    <li className="relative flex rounded-md p-3 shadow-sm ring-1 ring-gray-900/10">
      <FileIcon
        ext={fileExtension}
        size="lg"
        containerProps={{ className: 'mt-1.5 mr-2' }}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{attachment.name}</p>
        <p className="truncate text-sm text-gray-500">
          {formatBytesToHumanReadable(attachment.size)}
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

export const ComposerAttachments = ({
  acceptedFiles,
  rejectedFiles: _rejectedFiles,
  setIsUploadingFiles,
  setUploadedFiles,
  setShouldClearFiles,
  shouldClearFiles = false,
}: AttachmentsProps) => {
  const {
    progress: fileUploadProgress,
    dispatch,
    upload,
    removeFileEntry,
  } = useMultiFileUpload();
  const [isOpen, setIsOpen] = useState(false);
  const [rejectedFiles, setRejectedFiles] = useState(_rejectedFiles);

  useEffect(() => setRejectedFiles(_rejectedFiles), [_rejectedFiles]);

  const rejectedOrErrorAttachments = useMemo(
    () => [...rejectedFiles, ...fileUploadProgress.errorFiles],
    [rejectedFiles, fileUploadProgress.errorFiles],
  );

  useEffect(() => {
    upload(acceptedFiles);
  }, [upload, acceptedFiles]);

  useEffect(() => {
    // Show the modal when the user selects invalid files and/or
    // one of their uploads fails.
    if (
      rejectedFiles.length ||
      (!fileUploadProgress.isInFlight && fileUploadProgress.errorFiles.length)
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [
    fileUploadProgress.isInFlight,
    fileUploadProgress.errorFiles,
    rejectedFiles,
  ]);

  useEffect(() => {
    if (fileUploadProgress.isInFlight) {
      setIsUploadingFiles(true);
    } else {
      setIsUploadingFiles(false);
      setUploadedFiles(
        fileUploadProgress.uploadedFiles.map((element) => element.file),
      );
    }
  }, [
    fileUploadProgress.isInFlight,
    fileUploadProgress.uploadedFiles,
    setIsUploadingFiles,
    setUploadedFiles,
  ]);

  useEffect(() => {
    if (shouldClearFiles) {
      dispatch({ type: FileUploadActionType.Reset });
      setShouldClearFiles(false);
    }
  }, [shouldClearFiles, setShouldClearFiles, dispatch]);

  const onClose = useCallback(() => {
    setIsOpen(false);

    // Reset error state so that the modal is only shown once per transaction.
    dispatch({ type: FileUploadActionType.ClearErrorFiles });
    setRejectedFiles([]);
  }, [dispatch]);

  const files = useMemo(
    () => [...fileUploadProgress.files.sort((a, b) => (a.id > b.id ? 1 : -1))],
    [fileUploadProgress.files],
  );

  // TODO: Get image/video previews working.
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Upload failed"
            description="Sorry, there was a problem while uploading some of your attachment(s)."
            dismiss
          />
          <Modal.Body className="max-h-80">
            <ul className="h-full space-y-3 overflow-y-auto overflow-x-hidden p-2">
              {rejectedOrErrorAttachments.map(({ file, ...rest }) => (
                <RejectedOrErrorAttachment
                  key={`${file.name}-${file.size.toString()}`}
                  attachment={file}
                  errorCode={
                    'errors' in rest ? rest.errors[0].code : rest.errorCode!
                  }
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
        <ul className="flex flex-wrap gap-3 py-2" role="list">
          {files.map((file) => (
            <ComposerAttachment
              key={file.id}
              removeFileEntry={removeFileEntry}
              {...file}
            />
          ))}
        </ul>
      )}
    </>
  );
};
