import {
  ConnectionHandler,
  graphql,
  useFragment,
  useMutation,
} from 'react-relay';
import { RecordProxy, RecordSourceSelectorProxy } from 'relay-runtime';
import { Editor } from '../Editor';
import { useToast } from '../../../../shared/components';
import { CreateAnnouncementMutation } from './__generated__/CreateAnnouncementMutation.graphql';
import { CreateAnnouncement_classroom$key } from './__generated__/CreateAnnouncement_classroom.graphql';

export const sharedUpdater = (
  store: RecordSourceSelectorProxy,
  classroomId: string,
  announcement: RecordProxy,
  deletedAnnouncementId?: string,
) => {
  // Get the classroom.
  const classroomRecord = store.get(classroomId);
  if (!classroomRecord) {
    throw new Error(
      `Unable to get classroom record for classroomId: ${classroomId}`,
    );
  }

  // Get the connection.
  const key = 'AnnouncementsList_announcements';
  const conn = ConnectionHandler.getConnection(classroomRecord, key, {
    order: { createdAt: 'DESC' },
  });
  if (!conn) {
    throw new Error(`Unable to get connection by key: ${key}`);
  }

  if (deletedAnnouncementId) {
    ConnectionHandler.deleteNode(conn, deletedAnnouncementId);
  } else {
    // Insert a new edge.
    const newEdge = ConnectionHandler.createEdge(
      store,
      conn,
      announcement,
      'AnnouncementsEdge',
    );
    ConnectionHandler.insertEdgeBefore(conn, newEdge);
  }
};

const fragment = graphql`
  fragment CreateAnnouncement_classroom on Classroom {
    id
  }
`;

const mutation = graphql`
  mutation CreateAnnouncementMutation(
    $input: CreateClassroomAnnouncementInput!
  ) {
    createClassroomAnnouncement(input: $input) {
      classroomAnnouncement {
        ...Announcement_classroomAnnouncement
      }
    }
  }
`;

interface Props {
  classroom: CreateAnnouncement_classroom$key;
  onEditorClose(): void;
}

const CreateAnnouncement = ({ onEditorClose, ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const [createAnnouncement, isInFlight] =
    useMutation<CreateAnnouncementMutation>(mutation);
  const { handleError } = useToast();

  return (
    <Editor
      readOnly={false}
      onCancel={onEditorClose}
      isSaving={isInFlight}
      onSave={(state) =>
        createAnnouncement({
          variables: {
            input: {
              classroomId: classroom.id,
              content: state,
            },
          },
          onError: () => handleError(),
          onCompleted: onEditorClose,
          updater: (store) => {
            const announcement = store
              .getRootField('createClassroomAnnouncement')
              .getLinkedRecord('classroomAnnouncement');

            sharedUpdater(store, classroom.id, announcement);
          },
        })
      }
      containerProps={{ className: 'pb-2' }}
    />
  );
};

export default CreateAnnouncement;
