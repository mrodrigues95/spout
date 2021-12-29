import mime from 'mime-types';
import { FileExtension } from '../../__generated__/schema.generated';

export const MAX_FILES_PER_UPLOAD = 10;
export const MIN_FILE_SIZE = 1;
export const MAX_FILE_SIZE = 8388608; // 8MB (8388608 bytes).

export const getAcceptedFileExtensions = () => {
  const acceptedFileExtensions: string[] = [];

  for (const ext in FileExtension) {
    const prefix = '.';
    const accepted = `${prefix}${ext.toLowerCase()}`;
    acceptedFileExtensions.push(accepted);
  }

  return acceptedFileExtensions;
};

export const getFileExtensionFromContentType = (type: string) => {
  const extension = mime.extension(type);
  if (!extension) return null;


  return extension.toUpperCase() as FileExtension;
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
