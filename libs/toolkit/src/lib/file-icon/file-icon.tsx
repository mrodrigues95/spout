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
  default: {
    icon: faFileAlt,
    color: 'text-gray-600',
  },
} as const;

export const FILE_EXTENSIONS = {
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
  pdf: types.pdf,
  dot: types.word,
  dotx: types.word,
  doc: types.word,
  docx: types.word,
  ppt: types.presentation,
  pptx: types.presentation,
  xls: types.spreadsheet,
  xlsx: types.spreadsheet,
  csv: types.spreadsheet,
  zip: types.compressed,
  default: types.default,
} as const;

export interface FileIconProps
  extends Omit<FontAwesomeIconProps, 'icon' | 'color'> {
  ext: keyof typeof FILE_EXTENSIONS;
}

export const FileIcon = ({
  ext = 'default',
  className,
  ...props
}: FileIconProps) => {
  const extension = ext in FILE_EXTENSIONS ? ext : 'default';
  const icon = FILE_EXTENSIONS[extension].icon;

  return (
    <FontAwesomeIcon
      icon={icon}
      className={clsx(FILE_EXTENSIONS[extension].color, className)}
      {...props}
    />
  );
};
