import { useCallback, useState } from 'react';
import {
  ConnectionHandler,
  graphql,
  useFragment,
  useMutation,
} from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import z from 'zod';
import {
  Button,
  getHorizontalNavigationItemStyles,
  Tooltip,
  Modal,
  Form,
  useZodForm,
} from '@spout/toolkit';
import { useToast } from '../../../../shared/components';
import { CreateDiscussion_classroom$key } from './__generated__/CreateDiscussion_classroom.graphql';
import { CreateDiscussionMutation } from './__generated__/CreateDiscussionMutation.graphql';

const fragment = graphql`
  fragment CreateDiscussion_classroom on Classroom {
    id
  }
`;

const mutation = graphql`
  mutation CreateDiscussionMutation($input: CreateDiscussionInput!) {
    createDiscussion(input: $input) {
      discussion {
        id
        name
        classroom {
          id
        }
      }
    }
  }
`;

const schema = z.object({
  name: z.string().min(1).max(64, { message: '- Max 64 characters' }),
});

interface Props {
  classroom: CreateDiscussion_classroom$key;
}

const CreateDiscussion = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const [isOpen, setIsOpen] = useState(false);
  const [createDiscussion, isInFlight] =
    useMutation<CreateDiscussionMutation>(mutation);
  const { handleError } = useToast();
  const styles = getHorizontalNavigationItemStyles();

  const form = useZodForm({
    schema,
  });

  const closeModal = useCallback(() => {
    setIsOpen(false);
    form.reset();
  }, [form]);

  const onSubmit = useCallback(
    ({ name }: z.infer<typeof schema>) => {
      createDiscussion({
        variables: {
          input: {
            classroomId: classroom.id,
            name,
          },
        },
        onError: () => handleError(),
        onCompleted: closeModal,
        updater: (store) => {
          const discussion = store
            .getRootField('createDiscussion')
            .getLinkedRecord('discussion');

          // Get the classroom.
          const classroomRecord = store.get(classroom.id);
          if (!classroomRecord) {
            throw new Error(
              `Unable to get classroom record for classroomId: ${classroom.id}`,
            );
          }

          // Get the connection.
          const key = 'DiscussionsMenu_discussions';
          const conn = ConnectionHandler.getConnection(classroomRecord, key, {
            order: { name: 'ASC' },
          });
          if (!conn) {
            throw new Error(`Unable to get connection by key: ${key}`);
          }

          // Insert a new edge.
          // TODO: We sort alphabetically by discussion name but this just inserts
          // a new edge at the end which is incorrect. Maybe refetch instead?
          const newEdge = ConnectionHandler.createEdge(
            store,
            conn,
            discussion,
            'DiscussionsEdge',
          );
          ConnectionHandler.insertEdgeAfter(conn, newEdge);
        },
      });
    },
    [createDiscussion, classroom.id, closeModal, handleError],
  );

  return (
    <>
      <Tooltip label="Create Discussion">
        <Button
          className={clsx(styles.base, styles.active)}
          variant="unstyled"
          onClick={() => setIsOpen(true)}
          aria-label="Create discussion"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Create Discussion"
            description="Discussions help you better communicate with students"
          />
          <Form form={form} onSubmit={onSubmit}>
            <Modal.Body>
              <Form.Input
                label="Name"
                placeholder="Name"
                required
                {...form.register('name')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button size="sm" disabled={isInFlight} onClick={closeModal}>
                Cancel
              </Button>
              <Form.SubmitButton
                size="sm"
                variant="primary"
                loading={isInFlight}
              >
                Create
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default CreateDiscussion;
