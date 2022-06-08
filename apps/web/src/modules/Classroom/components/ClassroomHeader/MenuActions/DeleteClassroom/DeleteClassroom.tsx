import { Dispatch } from 'react';
import { useRouter } from 'next/router';
import { graphql, useFragment, useMutation } from 'react-relay';
import { Button, Modal } from '@spout/toolkit';
import { useToast } from '../../../../../../shared/components';
import { Action, ActionType } from '../MenuActions';
import { DeleteClassroom_classroom$key } from './__generated__/DeleteClassroom_classroom.graphql';
import { DeleteClassroomMutation } from './__generated__/DeleteClassroomMutation.graphql';
import { DeleteClassroom_user$key } from './__generated__/DeleteClassroom_user.graphql';

const mutation = graphql`
  mutation DeleteClassroomMutation($input: DeleteClassroomInput!) {
    deleteClassroom(input: $input) {
      classroom {
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

const classroomFragment = graphql`
  fragment DeleteClassroom_classroom on Classroom {
    id
    name
  }
`;

const meFragment = graphql`
  fragment DeleteClassroom_user on User {
    id
  }
`;

interface Props {
  classroom: DeleteClassroom_classroom$key;
  me: DeleteClassroom_user$key;
  dispatch: Dispatch<Action>;
}

const DeleteClassroom = ({ dispatch, ...props }: Props) => {
  const router = useRouter();
  const classroom = useFragment(classroomFragment, props.classroom);
  const me = useFragment(meFragment, props.me);
  const [commit, isInFlight] = useMutation<DeleteClassroomMutation>(mutation);
  const { handleError, toast } = useToast();

  const close = () =>
    dispatch({ type: ActionType.DeleteClassroom, isOpen: false });

  return (
    <Modal isOpen onClose={close}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header
          title={`Delete ${classroom.name}`}
          description="Are you sure you want to delete this classroom? This action cannot be undone."
        />
        <Modal.Footer>
          <Button
            size="sm"
            variant="tertiary"
            onClick={close}
            disabled={isInFlight}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => {
              commit({
                variables: {
                  input: {
                    classroomId: classroom.id,
                  },
                },
                onError: () => handleError(),
                onCompleted: ({ deleteClassroom: { errors } }) => {
                  if (errors) {
                    return handleError();
                  }

                  toast.success('Classroom successfully deleted!');
                  router.replace('/home');
                  close();
                },
                updater: (store) => {
                  const classroom = store
                    .getRootField('deleteClassroom')
                    .getLinkedRecord('classroom');

                  const userRecord = store.get(me.id);

                  // Update the sidebar and remove the classroom from it.
                  const userClassrooms =
                    userRecord!.getLinkedRecords('classrooms') || [];

                  userRecord!.setLinkedRecords(
                    userClassrooms.filter(
                      (c) => c.getDataID() !== classroom.getDataID(),
                    ),
                    'classrooms',
                  );
                },
              });
            }}
            loading={isInFlight}
            className="bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-red-700 active:bg-red-800"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteClassroom;
