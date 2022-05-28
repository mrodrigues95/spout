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
import { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

const CONTENT_TYPES = {
  audio: {
    icon: faFileAudio,
    bgColor: 'bg-amber-100',
    color: 'text-amber-600',
  },
  image: {
    icon: faFileImage,
    bgColor: 'bg-emerald-100',
    color: 'text-emerald-600',
  },
  video: {
    icon: faFileVideo,
    bgColor: 'bg-sky-100',
    color: 'text-sky-600',
  },
  text: {
    icon: faFileAlt,
    bgColor: 'bg-gray-100',
    color: 'text-gray-600',
  },
  application: {
    pdf: {
      icon: faFilePdf,
      bgColor: 'bg-red-100',
      color: 'text-red-600',
    },
    word: {
      icon: faFileWord,
      bgColor: 'bg-blue-100',
      color: 'text-blue-600',
    },
    presentation: {
      icon: faFilePowerpoint,
      bgColor: 'bg-orange-100',
      color: 'text-orange-600',
    },
    spreadsheet: {
      icon: faFileExcel,
      bgColor: 'bg-emerald-100',
      color: 'text-emerald-600',
    },
    compressed: {
      icon: faFileArchive,
      bgColor: 'bg-violet-100',
      color: 'text-violet-600',
    },
  },
  other: {
    icon: faFileAlt,
    bgColor: 'bg-gray-100',
    color: 'text-gray-600',
  },
} as const;

export const COMMON_FILE_EXTENSIONS = {
  gif: CONTENT_TYPES.image,
  jpeg: CONTENT_TYPES.image,
  jpg: CONTENT_TYPES.image,
  png: CONTENT_TYPES.image,
  bmp: CONTENT_TYPES.image,
  dwg: CONTENT_TYPES.image,
  dxf: CONTENT_TYPES.image,
  tiff: CONTENT_TYPES.image,
  tif: CONTENT_TYPES.image,
  aac: CONTENT_TYPES.audio,
  mp3: CONTENT_TYPES.audio,
  wav: CONTENT_TYPES.audio,
  avi: CONTENT_TYPES.video,
  mov: CONTENT_TYPES.video,
  wmv: CONTENT_TYPES.video,
  mpeg: CONTENT_TYPES.video,
  mp4: CONTENT_TYPES.video,
  txt: CONTENT_TYPES.text,
  text: CONTENT_TYPES.text,
  pdf: CONTENT_TYPES.application.pdf,
  dot: CONTENT_TYPES.application.word,
  dotx: CONTENT_TYPES.application.word,
  doc: CONTENT_TYPES.application.word,
  docx: CONTENT_TYPES.application.word,
  ppt: CONTENT_TYPES.application.presentation,
  pptx: CONTENT_TYPES.application.presentation,
  xls: CONTENT_TYPES.application.spreadsheet,
  xlsx: CONTENT_TYPES.application.spreadsheet,
  csv: CONTENT_TYPES.application.spreadsheet,
  zip: CONTENT_TYPES.application.compressed,
  other: CONTENT_TYPES.other,
} as const;

const FILE_ICON_SIZE = {
  sm: {
    container: 'w-6 h-6',
    icon: 'text-sm',
  },
  md: {
    container: 'w-8 h-8',
    icon: 'text-base',
  },
  lg: {
    container: 'w-10 h-10',
    icon: 'text-lg',
  },
  xl: {
    container: 'w-12 h-12',
    icon: 'text-2xl',
  },
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

export interface FileIconProps {
  /** The file extension. */
  ext?: CommonFileExtensionKeys;
  /** The `FileIcon` size. */
  size?: keyof typeof FILE_ICON_SIZE;
  /**
   * The file name.
   *
   * The file extension will attempt to be parsed from the file name.
   * If parsing fails, `CommonFileExtensionKeys.other` will be used as a fallback.
   */
  fileName?: string;
  /**
   * Props applied to the container element.
   */
  containerProps?: ComponentProps<'span'>;
  /**
   * Props applied to the `FontAwesomeIcon` component.
   */
  iconProps?: Omit<FontAwesomeIconProps, 'icon' | 'color'>;
}

export const FileIcon = ({
  size = 'md',
  ext,
  fileName,
  containerProps,
  iconProps,
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
    <span
      {...containerProps}
      className={twMerge(
        clsx(
          'inline-flex items-center justify-center rounded-full p-2',
          COMMON_FILE_EXTENSIONS[extension].bgColor,
          FILE_ICON_SIZE[size].container,
          containerProps?.className,
        ),
      )}
    >
      <FontAwesomeIcon
        {...iconProps}
        icon={icon}
        className={clsx(
          COMMON_FILE_EXTENSIONS[extension].color,
          FILE_ICON_SIZE[size].icon,
          iconProps?.className,
        )}
      />
    </span>
  );
};
