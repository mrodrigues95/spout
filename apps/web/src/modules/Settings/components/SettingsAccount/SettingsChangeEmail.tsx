import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import {
  Button,
  Title,
  Text,
  Alert,
  Modal,
  Form,
  useZodForm,
} from '@spout/toolkit';
import { useResendVerificationEmail } from './hooks';
import { useTimeout } from '../../../../shared/hooks';
import { useToast } from '../../../../shared/components';
import { SettingsChangeEmail_user$key } from '../../../../__generated__/SettingsChangeEmail_user.graphql';
import { SettingsChangeEmailMutation } from '../../../../__generated__/SettingsChangeEmailMutation.graphql';

interface BaseModalProps {
  email: string;
  close(): void;
  setIsEmailSent(value: boolean): void;
}

const VerificationEmailSentModal = ({
  email,
  close,
}: Pick<BaseModalProps, 'email' | 'close'>) => {
  return (
    <>
      <Modal.Header
        title="Verification email sent"
        description={`A verification email has been sent to ${email}. Please check your inbox or spam folder.`}
      />
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={close}>
          OK
        </Button>
      </Modal.Footer>
    </>
  );
};

const UnverifiedEmailModal = ({ close, setIsEmailSent }: BaseModalProps) => {
  const { handleError } = useToast();
  const [resendEmail, isInFlight] = useResendVerificationEmail();

  return (
    <>
      <Modal.Header
        title="Unverified email"
        description="You must verify your current email address before it can be changed."
      />
      <Modal.Body>
        <Button
          variant="primary"
          fullWidth
          loading={isInFlight}
          onClick={() =>
            resendEmail({
              variables: {},
              onCompleted: () => setIsEmailSent(true),
              onError: () => handleError(),
            })
          }
        >
          Resend Verification Email
        </Button>
        <Button fullWidth disabled={isInFlight} onClick={close}>
          Cancel
        </Button>
      </Modal.Body>
    </>
  );
};

const changeEmailSchema = object({
  currentEmail: string().optional(),
  newEmail: string().email({ message: '- Invalid email address' }),
  currentPassword: string().min(6, { message: '- Invalid password' }),
}).refine((data) => data.currentEmail !== data.newEmail, {
  message: '- Email already registered',
  path: ['newEmail'],
});

const mutation = graphql`
  mutation SettingsChangeEmailMutation($input: GenerateChangeEmailTokenInput!) {
    generateChangeEmailToken(input: $input) {
      authPayload {
        user {
          email
          emailConfirmed
        }
      }
      errors {
        ... on IncorrectCurrentPasswordError {
          __typename
          message
        }
      }
    }
  }
`;

const VerifiedEmailModal = ({
  email,
  close,
  setIsEmailSent,
  setNewEmail,
}: BaseModalProps & { setNewEmail(value: string): void }) => {
  const { handleError } = useToast();
  const [changeEmail, isInFlight] =
    useMutation<SettingsChangeEmailMutation>(mutation);

  const form = useZodForm({
    schema: changeEmailSchema,
    defaultValues: { currentEmail: email },
  });

  const onSubmit = useCallback(
    ({ newEmail, currentPassword }: Zod.infer<typeof changeEmailSchema>) =>
      changeEmail({
        variables: { input: { newEmail, password: currentPassword } },
        onCompleted: ({ generateChangeEmailToken: { errors } }) => {
          if (!errors) {
            setIsEmailSent(true);
            setNewEmail(newEmail);
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
            default:
              return;
          }
        },
        onError: () => handleError(),
      }),
    [changeEmail, handleError, setIsEmailSent, setNewEmail, form],
  );

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Modal.Header title="Change your email address" />
      <Modal.Body>
        <Form.Input
          label="Current email address"
          type="email"
          {...form.register('currentEmail')}
          defaultValue={email}
          disabled
        />
        <Form.Input
          label="New email address"
          placeholder="New email address"
          type="email"
          autoComplete="email"
          autoFocus
          required
          {...form.register('newEmail')}
        />
        <Form.Input
          label="Current password"
          placeholder="Current Password"
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
          onClick={close}
          disabled={isInFlight}
        >
          Cancel
        </Button>
        <Form.SubmitButton size="sm" variant="primary" loading={isInFlight}>
          Save
        </Form.SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

const fragment = graphql`
  fragment SettingsChangeEmail_user on User {
    email
    emailConfirmed
  }
`;

interface Props {
  me: SettingsChangeEmail_user$key;
}

const SettingsChangeEmail = ({ ...props }: Props) => {
  const me = useFragment(fragment, props.me);
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [resendEmail] = useResendVerificationEmail();
  const { timeout } = useTimeout();
  const { handleError } = useToast();

  const close = useCallback(() => {
    setIsOpen(false);
    timeout(() => setIsEmailSent(false), 500);
  }, [setIsOpen, timeout]);

  return (
    <>
      {!me.emailConfirmed && (
        <div>
          <Alert
            severity="warning"
            title="Unverified email"
            description="We sent you an email to verify your account. If you did not receive an email or if it expired, you can resend it."
          >
            <Alert.Action
              onClick={() =>
                resendEmail({
                  variables: {},
                  onCompleted: () => {
                    setIsOpen(true);
                    setIsEmailSent(true);
                  },
                  onError: () => handleError(),
                })
              }
            >
              Resend Verification Email
            </Alert.Action>
          </Alert>
        </div>
      )}
      <div className="flex items-center">
        <div className="flex-1">
          <Title as="h2" variant="h5" className="font-medium">
            Email
          </Title>
          <Text size="sm">{me.email}</Text>
        </div>
        <Button onClick={() => setIsOpen(true)}>Change Email</Button>
      </div>
      <Modal isOpen={isOpen} onClose={close}>
        <Modal.Overlay />
        <Modal.Content className="w-[18rem] sm:w-[30rem]">
          {isEmailSent ? (
            <VerificationEmailSentModal
              email={newEmail || me.email}
              close={close}
            />
          ) : me.emailConfirmed ? (
            <VerifiedEmailModal
              email={me.email}
              close={close}
              setIsEmailSent={setIsEmailSent}
              setNewEmail={setNewEmail}
            />
          ) : (
            <UnverifiedEmailModal
              email={me.email}
              close={close}
              setIsEmailSent={setIsEmailSent}
            />
          )}
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SettingsChangeEmail;
