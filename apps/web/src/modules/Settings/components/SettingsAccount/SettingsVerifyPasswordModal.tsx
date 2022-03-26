import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Button, Form, Modal, useZodForm } from '@spout/toolkit';
import { useToast } from '../../../../shared/components';
import { SettingsVerifyPasswordModalMutation } from '../../../../__generated__/SettingsVerifyPasswordModalMutation.graphql';

const currentPasswordSchema = object({
  currentPassword: string().min(6, { message: '- Invalid password' }),
});

interface EnterPasswordModalProps {
  onPasswordVerified(): void;
  closeModal(): void;
}

const SettingsVerifyPasswordModal = ({
  onPasswordVerified,
  closeModal,
}: EnterPasswordModalProps) => {
  const { handleError } = useToast();
  const [verifyPassword, isInFlight] =
    useMutation<SettingsVerifyPasswordModalMutation>(graphql`
      mutation SettingsVerifyPasswordModalMutation(
        $input: VerifyPasswordInput!
      ) {
        verifyPassword(input: $input) {
          errors {
            ... on IncorrectCurrentPasswordError {
              message
            }
          }
        }
      }
    `);

  const form = useZodForm({
    schema: currentPasswordSchema,
  });

  const onSubmit = useCallback(
    ({ currentPassword }: Zod.infer<typeof currentPasswordSchema>) =>
      verifyPassword({
        variables: { input: { currentPassword } },
        onCompleted: ({ verifyPassword: { errors } }) => {
          if (!errors) {
            onPasswordVerified();
          } else {
            form.setError(
              'currentPassword',
              {
                type: 'manual',
                message: '- Invalid password',
              },
              { shouldFocus: true },
            );
          }
        },
        onError: () => handleError(),
      }),
    [form, handleError, verifyPassword, onPasswordVerified],
  );

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Modal.Header
        title="Enter your password"
        description="Before continuing, please enter your password."
      />
      <Modal.Body>
        <Form.Input
          label="Current password"
          placeholder="Current password"
          autoComplete="current-password"
          type="password"
          required
          {...form.register('currentPassword')}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          variant="tertiary"
          onClick={closeModal}
          disabled={isInFlight}
        >
          Cancel
        </Button>
        <Form.SubmitButton size="sm" variant="primary" loading={isInFlight}>
          Continue
        </Form.SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

export default SettingsVerifyPasswordModal;
