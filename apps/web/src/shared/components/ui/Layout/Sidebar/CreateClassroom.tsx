import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import Zod, { object, string } from 'zod';
import { Button, Modal, Form, useZodForm } from '@spout/toolkit';
import { useIsRedirecting } from '../../../../hooks';
import { useToast } from '../../../../../shared/components';
import { CreateClassroomMutation } from './__generated__/CreateClassroomMutation.graphql';

const schema = object({
  name: string().min(1, '- Invalid name').max(64, '- Invalid name'),
});

const mutation = graphql`
  mutation CreateClassroomMutation($input: CreateClassroomInput!) {
    createClassroom(input: $input) {
      classroom {
        id
        name
        createdBy {
          id
        }
      }
    }
  }
`;

const CreateClassroom = () => {
  const router = useRouter();
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [createClassroom, isInFlight] = useMutation<CreateClassroomMutation>(
    mutation
  );

  const form = useZodForm({
    schema,
  });

  const onSubmit = useCallback(
    ({ name }: Zod.infer<typeof schema>) => {
      createClassroom({
        variables: { input: { name } },
        onError: () => handleError(),
        onCompleted: ({ createClassroom }) => {
          setIsOpen(false);
          router.push(`/classrooms/${createClassroom!.classroom!.id}`);
        },
      });
    },
    [createClassroom, handleError, router]
  );

  return (
    <>
      <Button
        size="xs"
        variant="light"
        scheme="orange"
        className="uppercase rounded"
        onClick={() => setIsOpen(true)}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content>
            <Modal.Header
              title="Create Your Classroom"
              description="Classrooms help you better manage your discussions."
              dismiss
            />
            <Modal.Body>
              <Form.Input
                label="Classroom Name"
                placeholder="PROG3120 - Programming Fundamentals"
                {...form.register('name')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Form.SubmitButton
                disabled={isInFlight || isRedirecting}
                size="sm"
                className="font-semibold"
              >
                Create Classroom
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
    </>
  );
};

export default CreateClassroom;
