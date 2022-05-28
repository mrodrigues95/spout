import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
  Card,
  FileIcon,
  Text,
  Button,
  getFileExtensionFromFileName,
  Spinner,
} from '@spout/toolkit';
import {
  formatBytesToHumanReadable,
  getErrorMessageFromErrorCode,
} from '../../../../../../shared/utils';
import { useMultiFileUpload } from '../../../../../../shared/hooks';
import { MultiFileUploadEntryWithDropzoneRejection } from './SyllabusUploadAttachments';

interface Props {
  attachment: MultiFileUploadEntryWithDropzoneRejection;
  removeFile: ReturnType<typeof useMultiFileUpload>['removeFileEntry'];
}

const SyllabusUploadAttachment = ({ attachment, removeFile }: Props) => {
  const { id, file, isUploading, isUploaded, isError, isRejected, errorCode } =
    attachment;
  const ext = getFileExtensionFromFileName(file.name).toKey();
  const errorMessage = getErrorMessageFromErrorCode(errorCode);

  return (
    <li role="listitem">
      <Card className="flex items-center">
        <FileIcon
          ext={ext}
          size="md"
          containerProps={{ className: 'mr-2.5' }}
        />
        <div className="min-w-0 flex-1">
          <Text weight="medium" truncate>
            {file.name}
          </Text>
          <Text
            size="sm"
            weight={isError || isRejected ? 'medium' : 'normal'}
            color={isError || isRejected ? 'error' : 'muted'}
            truncate
          >
            {(isError || isRejected) && errorMessage
              ? errorMessage
              : formatBytesToHumanReadable(file.size)}
          </Text>
        </div>
        {isUploading && <Spinner variant="circle" size="sm" />}
        {(isError || isRejected || isUploaded) && (
          <>
            <Button
              onClick={() => {
                if (isError || isRejected) {
                  removeFile(id);
                } else {
                  removeFile(id, {
                    delete: true,
                    fileId: file.id,
                  });
                }
              }}
              variant="tertiary"
              size="sm"
              className="mr-2.5"
            >
              Remove
            </Button>
            <FontAwesomeIcon
              icon={isError || isRejected ? faTimesCircle : faCircleCheck}
              className={
                isError || isRejected ? 'text-red-700' : 'text-green-700'
              }
            />
          </>
        )}
      </Card>
    </li>
  );
};

export default SyllabusUploadAttachment;
