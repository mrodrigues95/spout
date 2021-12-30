import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
} from '@fortawesome/free-regular-svg-icons';
import clsx from 'clsx';

const types = {
  audio: {
    icon: faFileAudio,
    color: 'text-yellow-600',
  },
  image: {
    icon: faFileImage,
    color: 'text-emerald-600',
  },
  video: {
    icon: faFileVideo,
    color: 'text-sky-600',
  },
  text: {
    icon: faFileAlt,
    color: 'text-gray-600',
  },
  application: {
    pdf: {
      icon: faFilePdf,
      color: 'text-red-600',
    },
    word: {
      icon: faFileWord,
      color: 'text-blue-600',
    },
    presentation: {
      icon: faFilePowerpoint,
      color: 'text-orange-600',
    },
    spreadsheet: {
      icon: faFileExcel,
      color: 'text-green-600',
    },
    compressed: {
      icon: faFileArchive,
      color: 'text-purple-600',
    },
  },
  other: {
    icon: faFileAlt,
    color: 'text-gray-600',
  },
} as const;

export const COMMON_FILE_EXTENSIONS = {
  gif: types.image,
  jpeg: types.image,
  jpg: types.image,
  png: types.image,
  bmp: types.image,
  dwg: types.image,
  dxf: types.image,
  tiff: types.image,
  tif: types.image,
  aac: types.audio,
  mp3: types.audio,
  wav: types.audio,
  avi: types.video,
  mov: types.video,
  wmv: types.video,
  mpeg: types.video,
  mp4: types.video,
  txt: types.text,
  text: types.text,
  pdf: types.application.pdf,
  dot: types.application.word,
  dotx: types.application.word,
  doc: types.application.word,
  docx: types.application.word,
  ppt: types.application.presentation,
  pptx: types.application.presentation,
  xls: types.application.spreadsheet,
  xlsx: types.application.spreadsheet,
  csv: types.application.spreadsheet,
  zip: types.application.compressed,
  other: types.other,
} as const;

export type CommonFileExtensionKeys = keyof typeof COMMON_FILE_EXTENSIONS;

export const getFileExtensionFromFileName = (fileName: string) => {
  const split = fileName.split('.');
  let ext = split.pop()!;

  const toKey = () => {
    if (!(ext in COMMON_FILE_EXTENSIONS)) {
      ext = 'other';
    }

    return ext as CommonFileExtensionKeys;
  };

  return { ext, toKey };
};

export interface FileIconProps
  extends Omit<FontAwesomeIconProps, 'icon' | 'color'> {
  /** The file extension. */
  ext?: CommonFileExtensionKeys;
  /** The file name.
   *
   * The file extension will attempt to be parsed from the file name.
   * If parsing fails, `CommonFileExtensionKeys.other` will be used as a fallback.
   */
  fileName?: string;
}

export const FileIcon = ({
  ext,
  fileName,
  className,
  ...props
}: FileIconProps) => {
  if (!ext && !fileName) {
    throw new Error('`ext` or `fileName` props must be provided.');
  }

  let extension: CommonFileExtensionKeys = 'other';
  if (fileName) {
    extension = getFileExtensionFromFileName(fileName).toKey();
  } else if (ext) {
    extension = ext;
  }

  const icon = COMMON_FILE_EXTENSIONS[extension].icon;

  return (
    <FontAwesomeIcon
      icon={icon}
      className={clsx(COMMON_FILE_EXTENSIONS[extension].color, className)}
      {...props}
    />
  );
};
