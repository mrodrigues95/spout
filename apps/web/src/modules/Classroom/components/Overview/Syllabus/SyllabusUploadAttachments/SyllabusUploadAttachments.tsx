import { useCallback, useEffect, useMemo, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { ErrorCode as DropzoneErrorCode, FileRejection } from 'react-dropzone';
import { Button, Dropzone, generateId, Title } from '@spout/toolkit';
import {
  MIN_FILE_SIZE,
  MAX_FILE_SIZE,
  MAX_FILES_PER_UPLOAD,
} from '../../../../../../shared/utils';
import {
  ActionType,
  FileUploadErrorCode,
  MultiFileUploadEntry,
  useMultiFileUpload,
} from '../../../../../../shared/hooks';
import { useToast } from '../../../../../../shared/components';
import SyllabusUploadAttachment from './SyllabusUploadAttachment';
import { SyllabusUploadAttachmentsMutation } from './__generated__/SyllabusUploadAttachmentsMutation.graphql';
import { SyllabusUploadAttachments_classroom$key } from './__generated__/SyllabusUploadAttachments_classroom.graphql';

const mutation = graphql`
  mutation SyllabusUploadAttachmentsMutation(
    $input: UpsertClassroomSyllabusInput!
  ) {
    upsertClassroomSyllabus(input: $input) {
      classroom {
        ...Syllabus_classroom
      }
    }
  }
`;

const fragment = graphql`
  fragment SyllabusUploadAttachments_classroom on Classroom {
    id
    syllabus {
      content
    }
  }
`;

export interface MultiFileUploadEntryWithDropzoneRejection
  extends Omit<MultiFileUploadEntry, 'errorCode'> {
  isRejected: boolean;
  errorCode?: FileUploadErrorCode | DropzoneErrorCode | string;
}

const mapFileRejectionToFileUploadEntry = (
  fileRejection: FileRejection,
): MultiFileUploadEntryWithDropzoneRejection => ({
  id: generateId(),
  file: fileRejection.file,
  isUploading: false,
  isUploaded: false,
  isError: false,
  isRejected: true,
  errorCode: fileRejection.errors[0].code,
});

interface Props {
  classroom: SyllabusUploadAttachments_classroom$key;
}

const SyllabusUploadAttachments = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const [commit, isInFlight] =
    useMutation<SyllabusUploadAttachmentsMutation>(mutation);
  const {
    progress: fileUploadProgress,
    dispatch,
    upload,
    removeFileEntry,
  } = useMultiFileUpload();
  const [rejectedAttachments, setRejectedAttachments] = useState<
    MultiFileUploadEntryWithDropzoneRejection[]
  >([]);
  const { handleError, toast } = useToast();

  const onAttachmentsAcepted = useCallback(
    (files: File[]) => upload(files),
    [upload],
  );

  const onAttachmentsRejected = useCallback(
    (files: FileRejection[]) =>
      setRejectedAttachments(files.map(mapFileRejectionToFileUploadEntry)),
    [],
  );

  useEffect(() => {
    if (!fileUploadProgress.files.length) {
      dispatch({ type: ActionType.Reset });
    }
  }, [dispatch, fileUploadProgress.files.length]);

  const attachmentsWithRejections = useMemo(
    () =>
      (
        [
          ...fileUploadProgress.files,
          ...rejectedAttachments,
        ] as MultiFileUploadEntryWithDropzoneRejection[]
      ).sort(
        (a, b) =>
          // Uploaded/uploading attachments always appear first.
          Number(b.isUploading || b.isUploading) -
          Number(a.isUploading || a.isUploading),
      ),
    [fileUploadProgress.files, rejectedAttachments],
  );

  return (
    <div className="space-y-4">
      <Title as="h3" variant="h4">
        Upload Attachments
      </Title>
      <Dropzone
        disabled={fileUploadProgress.isInFlight}
        minSize={MIN_FILE_SIZE}
        maxSize={MAX_FILE_SIZE}
        maxFiles={MAX_FILES_PER_UPLOAD}
        onDropAccepted={onAttachmentsAcepted}
        onDropRejected={onAttachmentsRejected}
        primaryMessage="Drag and drop attachments"
        secondaryMessage="Or browse files on your device"
        multiple
      />
      {!!attachmentsWithRejections.length && (
        <>
          <ul role="list" className="space-y-2.5">
            {attachmentsWithRejections.map((attachment) => (
              <SyllabusUploadAttachment
                key={`${
                  attachment.file.name
                }-${attachment.file.size.toString()}`}
                removeFile={(id, opts) =>
                  attachment.isRejected
                    ? setRejectedAttachments((prev) => [
                        ...prev.filter((att) => att.id !== id),
                      ])
                    : removeFileEntry(id, opts)
                }
                attachment={attachment}
              />
            ))}
          </ul>
          <Button
            disabled={
              fileUploadProgress.isInFlight ||
              !fileUploadProgress.uploadedFiles.length
            }
            loading={isInFlight}
            loadingText="Uploading..."
            className="ml-auto block"
            onClick={() => {
              commit({
                variables: {
                  input: {
                    classroomId: classroom.id,
                    content: classroom.syllabus!.content,
                    fileIds: fileUploadProgress.uploadedFiles.map(
                      (entry) => entry.file.id!,
                    ),
                  },
                },
                onError: () => handleError(),
                onCompleted: () => {
                  dispatch({ type: ActionType.Reset });
                  setRejectedAttachments([]);
                  toast.success('Attachments uploaded successfully');
                },
              });
            }}
          >
            Upload
          </Button>
        </>
      )}
    </div>
  );
};

export default SyllabusUploadAttachments;
