import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { useRouter } from 'next/router';
import { Button, Title, Modal, Form, useZodForm } from '@spout/toolkit';
import { useSession, useToast } from '../../../../shared/components';
import { SettingsChangePasswordMutation } from '../../../../__generated__/SettingsChangePasswordMutation.graphql';

const changePasswordSchema = object({
  currentPassword: string().min(6, { message: '- Invalid password' }),
  newPassword: string().min(6, { message: '- Invalid password' }),
  confirmNewPassword: string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: '- Passwords do not match',
  path: ['confirmNewPassword'],
});

const mutation = graphql`
  mutation SettingsChangePasswordMutation($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      errors {
        ... on IncorrectCurrentPasswordError {
          __typename
          message
        }
        ... on SessionExpiredError {
          __typename
          message
        }
      }
    }
  }
`;

const SettingsChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { sessionId } = useSession();
  const { toast, handleError } = useToast();
  const router = useRouter();
  const [changePassword, isInFlight] =
    useMutation<SettingsChangePasswordMutation>(mutation);

  const form = useZodForm({
    schema: changePasswordSchema,
  });

  const onSubmit = useCallback(
    ({
      currentPassword,
      newPassword,
    }: Zod.infer<typeof changePasswordSchema>) =>
      changePassword({
        variables: {
          input: {
            sessionId: sessionId!,
            currentPassword,
            newPassword,
          },
        },
        onError: () => handleError(),
        onCompleted: ({ changePassword: { errors } }) => {
          if (!errors) {
            setIsOpen(false);
            toast.success('Password successfully changed!');
            form.reset();
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            case 'IncorrectCurrentPasswordError':
              form.setError(
                'currentPassword',
                {
                  type: 'manual',
                  message: '- Invalid password',
                },
                { shouldFocus: true },
              );
              return;
            case 'SessionExpiredError':
              router.replace('/auth/login');
              return;
            default:
              return;
          }
        },
      }),
    [changePassword, sessionId, toast, handleError, router, form],
  );

  return (
    <div className="flex items-center">
      <Title as="h2" variant="h5" className="flex-1 font-medium">
        Password
      </Title>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content className="w-[18rem] sm:w-[30rem]">
            <Modal.Header title="Change your password" />
            <Modal.Body>
              <Form.Input
                label="Current password"
                placeholder="Current Password"
                autoComplete="current-password"
                type="password"
                {...form.register('currentPassword')}
              />
              <Form.Input
                label="New password"
                placeholder="New password"
                autoComplete="new-password"
                type="password"
                {...form.register('newPassword')}
              />
              <Form.Input
                label="Confirm new password"
                placeholder="Current password"
                autoComplete="new-password"
                type="password"
                {...form.register('confirmNewPassword')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                size="sm"
                variant="tertiary"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Form.SubmitButton
                size="sm"
                variant="primary"
                loading={isInFlight}
              >
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
    </div>
  );
};

export default SettingsChangePassword;
