import { useContext } from 'react';
import { useRouter } from 'next/router';
import { gql, useMutation } from '@apollo/client';
import { object, string } from 'zod';
import { Form, useZodForm, Modal } from '@spout/toolkit';
import {
  JoinClassroomMutation,
  JoinClassroomMutationVariables,
} from './__generated__/index.generated';
import { MenuContext } from '../../../MenuProvider';
import { useIsRedirecting } from '../../../../../../../../hooks/useIsRedirecting';
import useToast from '../../../../../../Toast';

// TODO: Update these at some point for prod.
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const codeReg = new RegExp(/^([A-Za-z0-9-_]{22})$/);
const linkReg = new RegExp(`/^(${APP_URL}\/)+([A-Za-z0-9-_]{22})$/`);
// const linkReg = new RegExp(
//   /^(https?:\/\/)?(www.)?(spout.local)\/+([A-Za-z0-9-_]{22})$/
// );

const inviteSchema = object({
  code: string(),
}).refine(({ code }) => codeReg.test(code) || linkReg.test(code), {
  message: '- Invalid invite link or invite code',
  path: ['code'],
});

const mutation = gql`
  mutation JoinClassroomMutation($input: JoinClassroomInput!) {
    joinClassroom(input: $input) {
      classroom {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
`;

const JoinClassroom = () => {
  const router = useRouter();
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();

  const [joinClassroom, result] = useMutation<
    JoinClassroomMutation,
    JoinClassroomMutationVariables
  >(mutation, {
    onError: (error) => handleError(error.message),
    onCompleted: ({ joinClassroom }) => {
      // If the user is already in this classroom, we return the classroom as well
      // and they should just be redirected.
      const shouldRedirect = joinClassroom.classroom;
      if (shouldRedirect) {
        router.push(`/classrooms/${joinClassroom.classroom!.id}`);
      }
    },
  });

  const { currentModal, setCurrentModal } = useContext(MenuContext)!;
  const isOpen = currentModal === 'join';
  const exampleInvite = 'iuWb_vb330ecKmXAFGkjfA';

  const form = useZodForm({
    schema: inviteSchema,
  });

  const isInvalidInvite = !!result.data?.joinClassroom.userErrors?.find(
    (error) => error.code === 'INVITE_EXPIRED'
  );

  return (
    <Modal isOpen={isOpen} onClose={() => setCurrentModal(null)}>
      <Modal.Overlay />
      <Form
        form={form}
        onSubmit={({ code }) => {
          joinClassroom({
            variables: {
              input: {
                code: code.replace(`${APP_URL}/`, ''),
              },
            },
          });
        }}
      >
        <Modal.Content>
          {isInvalidInvite ? (
            <Modal.Header
              title="Invalid invite"
              description="This invite has expired. Please try again with a new invite."
              descriptionProps={{ className: 'text-red-600' }}
              dismiss
            />
          ) : (
            <Modal.Header
              title="Join a Classroom"
              description="Enter an invite below to join an existing classroom"
              dismiss
            />
          )}
          <Modal.Body>
            <Form.Input
              label="Invite Link"
              placeholder={`${APP_URL}/${exampleInvite}`}
              autoFocus
              {...form.register('code')}
            />
          </Modal.Body>
          <Modal.Footer>
            <Form.SubmitButton
              disabled={result.loading || isRedirecting}
              size="sm"
              className="font-semibold"
            >
              Join Classroom
            </Form.SubmitButton>
          </Modal.Footer>
        </Modal.Content>
      </Form>
    </Modal>
  );
};

export default JoinClassroom;
