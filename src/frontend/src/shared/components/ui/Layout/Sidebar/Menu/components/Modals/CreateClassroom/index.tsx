import { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { object, string } from 'zod';
import {
  CreateClassroomMutation,
  CreateClassroomMutationVariables,
} from './__generated__/index.generated';
import { MenuContext } from '../../../MenuProvider';
import { Form, useZodForm } from '../../../../../../Form';
import { useIsRedirecting } from '../../../../../../../../hooks/useIsRedirecting';
import Modal from '../../../../../../Modal';
import Input from '../../../../../../Input';
import useToast from '../../../../../../Toast';

const schema = object({
  name: string().min(1, '- Invalid name').max(64, '- Invalid name'),
});

const mutation = gql`
  mutation CreateClassroomMutation($input: CreateClassroomInput!) {
    createClassroom(input: $input) {
      classroom {
        id
      }
    }
  }
`;

const CreateClassroom = () => {
  const router = useRouter();
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();

  const [createClassroom, result] = useMutation<
    CreateClassroomMutation,
    CreateClassroomMutationVariables
  >(mutation, {
    onError: (error) => handleError(error),
    onCompleted: ({ createClassroom }) => {
      router.push(`/classrooms/${createClassroom.classroom.id}`);
    },
  });

  const { currentModal, setCurrentModal } = useContext(MenuContext)!;
  const isOpen = currentModal === 'create';

  const form = useZodForm({
    schema,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setCurrentModal(null)}
      style={{ width: '32rem' }}
    >
      <Form
        form={form}
        onSubmit={({ name }) =>
          createClassroom({ variables: { input: { name } } })
        }
      >
        <Modal.Content>
          <Modal.Header
            title="Create Your Classroom"
            description="Classrooms help you better manage your discussions"
            dismiss
          />
          <Input
            label="Classroom Name"
            placeholder="PROG3120 - Programming Fundamentals"
            {...form.register('name')}
          />
        </Modal.Content>
        <Modal.Footer>
          <Form.SubmitButton
            disabled={result.loading || isRedirecting}
            size="sm"
            className="font-semibold"
          >
            Create Classroom
          </Form.SubmitButton>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateClassroom;
