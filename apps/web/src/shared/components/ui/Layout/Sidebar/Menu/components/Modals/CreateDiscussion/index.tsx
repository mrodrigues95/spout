import { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { object, string } from 'zod';
import { Form, useZodForm, Modal } from '@spout/toolkit';
import { MenuContext } from '../../../MenuProvider';
import { useIsRedirecting } from '../../../../../../../../hooks/useIsRedirecting';
import { query as ClassroomsQuery } from '../../../../Menu';
import {
  CreateDiscussionMutation,
  CreateDiscussionMutationVariables,
} from './__generated__/index.generated';
import useToast from '../../../../../../Toast';

const schema = object({
  name: string().min(1, '- Invalid name').max(64, '- Invalid name'),
});

const mutation = gql`
  mutation CreateDiscussionMutation($input: CreateDiscussionInput!) {
    createDiscussion(input: $input) {
      discussion {
        id
      }
    }
  }
`;

const CreateDiscussion = () => {
  const router = useRouter();
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();

  const [createDiscussion, result] = useMutation<
    CreateDiscussionMutation,
    CreateDiscussionMutationVariables
  >(mutation, {
    onError: (error) => handleError(error),
    onCompleted: ({ createDiscussion }) => {
      router.push(`/discussion/${createDiscussion.discussion.id}`);
    },
    refetchQueries: [ClassroomsQuery],
    awaitRefetchQueries: true,
  });

  const { currentModal, setCurrentModal, selectedClassroom } =
    useContext(MenuContext)!;
  const isOpen = currentModal === 'create-discussion';

  const form = useZodForm({
    schema,
  });

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Overlay />
      <Form
        form={form}
        onSubmit={({ name }) =>
          createDiscussion({
            variables: { input: { name, classroomId: selectedClassroom!.id! } },
          })
        }
      >
        <Modal.Content>
          <Modal.Header
            title="Create Discussion"
            description="Discussions encourage collaboration between classroom participants."
            dismiss
          />
          <Modal.Body>
            <Form.Input
              label="Discussion Name"
              placeholder="Exam Help"
              {...form.register('name')}
            />
          </Modal.Body>
          <Modal.Footer>
            <Form.SubmitButton
              disabled={result.loading || isRedirecting}
              size="sm"
              className="font-semibold"
            >
              Create Discussion
            </Form.SubmitButton>
          </Modal.Footer>
        </Modal.Content>
      </Form>
    </Modal>
  );
};

export default CreateDiscussion;
