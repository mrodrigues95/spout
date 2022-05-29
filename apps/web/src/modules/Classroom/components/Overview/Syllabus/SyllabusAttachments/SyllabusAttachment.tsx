import { useRouter } from 'next/router';
import { graphql, useFragment, useMutation } from 'react-relay';
import {
  Button,
  Card,
  FileIcon,
  getFileExtensionFromFileName,
  Link,
  Text,
} from '@spout/toolkit';
import { formatBytesToHumanReadable } from '../../../../../../shared/utils';
import { useToast } from '../../../../../../shared/components';
import { SyllabusAttachment_file$key } from './__generated__/SyllabusAttachment_file.graphql';
import { SyllabusAttachmentMutation } from './__generated__/SyllabusAttachmentMutation.graphql';

const fragment = graphql`
  fragment SyllabusAttachment_file on File {
    id
    location
    name
    contentLength
  }
`;

const mutation = graphql`
  mutation SyllabusAttachmentMutation($input: DeleteFileInput!) {
    deleteFile(input: $input) {
      file {
        id
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;

interface Props {
  attachment: SyllabusAttachment_file$key;
}

const SyllabusAttachment = ({ ...props }: Props) => {
  const router = useRouter();
  const attachment = useFragment(fragment, props.attachment);
  const [deleteAttachment, isInFlight] =
    useMutation<SyllabusAttachmentMutation>(mutation);
  const ext = getFileExtensionFromFileName(attachment.name).toKey();
  const { handleError } = useToast();

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
            {attachment.name}
          </Text>
          <Text size="sm" weight="normal" color="muted" truncate>
            {formatBytesToHumanReadable(attachment.contentLength)}
          </Text>
        </div>
        <Button
          onClick={() =>
            deleteAttachment({
              variables: { input: { fileId: attachment.id } },
              onError: () => handleError(),
              updater: (store) => {
                const deletedAttachmentId = store
                  .getRootField('deleteFile')
                  .getLinkedRecord('file')
                  .getValue('id');

                // Get the classroom.
                const classroomRecord = store.get(
                  router.query.classroomId as string,
                );
                if (!classroomRecord) {
                  throw new Error('Unable to get classroom record');
                }

                // Get the syllabus.
                const syllabus = classroomRecord.getLinkedRecord('syllabus');
                if (!syllabus) {
                  throw new Error('Unable to get classroom syllabus record.');
                }

                const attachmentRecords =
                  syllabus.getLinkedRecords('attachments') || [];

                // Remove the current record.
                const newRecords = [
                  ...attachmentRecords.filter(
                    (attachment) =>
                      attachment.getValue('id') !== deletedAttachmentId,
                  ),
                ];
                syllabus.setLinkedRecords(newRecords, 'attachments');
              },
            })
          }
          loading={isInFlight}
          loadingText="Removing..."
          variant="tertiary"
          size="sm"
          className="mr-2.5"
        >
          Remove
        </Button>
        <Link
          size="sm"
          href={attachment.location!}
          rel="noreferrer"
          target="_blank"
        >
          View
        </Link>
      </Card>
    </li>
  );
};

export default SyllabusAttachment;
