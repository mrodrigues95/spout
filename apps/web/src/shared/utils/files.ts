import { WhitelistedFileExtension } from '../../__generated__/useFileUploadGenerateUploadSASMutation.graphql';

export const MAX_FILES_PER_UPLOAD = 10;
export const MIN_FILE_SIZE = 1;

// TODO: We should just throw specific errors and handle them correctly
// on the client when dealing with large files or blacklisted extensions.
export const MAX_FILE_SIZE = 8388608; // 8MB (8388608 bytes).
export const WHITELISTED_EXTENSIONS = new Set<WhitelistedFileExtension>([
  'AAC',
  'AVI',
  'BMP',
  'CSV',
  'DOC',
  'DOCX',
  'DOT',
  'DOTX',
  'DWF',
  'DWG',
  'DXF',
  'GIF',
  'JPE',
  'JPEG',
  'JPG',
  'MOV',
  'MP3',
  'MP4',
  'MPEG',
  'PDF',
  'PNG',
  'PPT',
  'PPTX',
  'RTF',
  'TEXT',
  'TIF',
  'TIFF',
  'TXT',
  'WAV',
  'WMV',
  'XLS',
  'XLSX',
  'ZIP',
]);

export const validateWhitelistedExtension = (ext: string) => {
  const extension = ext.toUpperCase() as WhitelistedFileExtension;

  if (!WHITELISTED_EXTENSIONS.has(extension)) {
    console.warn(`${ext} is not a whitelisted file extension.`);
    return null;
  }

  return extension;
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
