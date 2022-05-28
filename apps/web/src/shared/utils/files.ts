import { ErrorCode as DropzoneErrorCode } from 'react-dropzone';
import { FileUploadErrorCode } from '../hooks';

export const MAX_FILES_PER_UPLOAD = 10;
export const MIN_FILE_SIZE = 1;

// TODO: We should just throw specific errors and handle them correctly
// on the client when dealing with large files or blacklisted extensions.
export const MAX_FILE_SIZE = 8388608; // 8MB.

export const getErrorMessageFromErrorCode = (
  errorCode?: DropzoneErrorCode | FileUploadErrorCode | string,
) => {
  if (!errorCode) return null;

  switch (errorCode) {
    case DropzoneErrorCode.FileTooSmall:
      return 'Attachment is too small - must be larger than 0 bytes';
    case DropzoneErrorCode.FileTooLarge:
      return 'Attachment is too large - must be smaller than 8MB';
    case DropzoneErrorCode.TooManyFiles:
      return 'Too many attachments - a maximum of 10 attachments can only be uploaded at once';
    case FileUploadErrorCode.FileInvalidType:
      return 'Unsupported file type';
    case FileUploadErrorCode.ServerError:
      return 'Server error - please try again';
    default:
      throw new Error('Unhandled error code');
  }
};

const units = [
  'bytes',
  'KB',
  'MB',
  'GB',
  'TB',
  'PB',
  'EB',
  'ZB',
  'YB',
] as const;
export const formatBytesToHumanReadable = (bytes: number) => {
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (!bytes && '0 bytes') ||
    (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + units[i]
  );
};
