import { WhitelistedFileExtension } from '../../__generated__/schema.generated';

export const MAX_FILES_PER_UPLOAD = 10;
export const MIN_FILE_SIZE = 1;
export const MAX_FILE_SIZE = 8388608; // 8MB (8388608 bytes).

export const getAcceptedFileExtensions = () => {
  const acceptedFileExtensions: string[] = [];

  for (const ext in WhitelistedFileExtension) {
    const prefix = '.';
    const accepted = `${prefix}${ext.toLowerCase()}`;
    acceptedFileExtensions.push(accepted);
  }

  return acceptedFileExtensions;
};

/**
 * Gets the `WhitelistedFileExtension` key for the given `ext`, if it exists.
 * 
 * `ext` can either be prefixed with or without a `.`
 * 
 * This is mainly used to convert raw file extension strings into a suitable
 * payload value for GraphQL mutations.
 * 
 * @param ext The file extension.
 * @returns A `WhitelistedFileExtension` key or `null` if no index is found.
 */
export const convertFileExtensionToEnumIndex = (ext: string) => {
  // If the extension is prefixed with '.', strip it first.
  const extension = ext.startsWith('.') ? ext.replace('.', '') : ext;

  // Capitlize the first letter so we can index it on the enum.
  const extensionIndex = extension.replace(/^./, (str) => str.toUpperCase());

  if (!(extensionIndex in WhitelistedFileExtension)) {
    console.warn(`${ext} is not a whitelisted file extension.`);
    return null;
  }

  return extensionIndex as keyof typeof WhitelistedFileExtension;
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
