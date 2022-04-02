import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Zod, { object, string } from 'zod';
import {
  faCheckCircle,
  faEnvelope,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form, Modal, Text, useZodForm } from '@spout/toolkit';
import { useSession, useToast } from '../../../../shared/components';
import { SettingsTwoFactorAuthProviderCard_user$key } from '../../../../__generated__/SettingsTwoFactorAuthProviderCard_user.graphql';
import { SettingsTwoFactorAuthProviderCardMutation } from '../../../../__generated__/SettingsTwoFactorAuthProviderCardMutation.graphql';

const currentPasswordSchema = object({
  currentPassword: string().min(6, { message: '- Invalid password' }),
});

const DisableTwoFactorAuthenticationModal = () => {
  const router = useRouter();
  const { handleError } = useToast();
  const { sessionId } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const [disableTwoFactor, isInFlight] =
    useMutation<SettingsTwoFactorAuthProviderCardMutation>(graphql`
      mutation SettingsTwoFactorAuthProviderCardMutation(
        $input: DisableTwoFactorInput!
      ) {
        disableTwoFactor(input: $input) {
          authPayload {
            user {
              preferredProvider
              twoFactorEnabled
              twoFactorEnabledAt
            }
          }
          errors {
            ... on Error {
              __typename
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
      disableTwoFactor({
        variables: { input: { sessionId: sessionId!, currentPassword } },
        onCompleted: ({ disableTwoFactor: { errors } }) => {
          if (!errors) {
            setIsOpen(false);
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
        onError: () => handleError(),
      }),
    [disableTwoFactor, form, handleError, router, sessionId],
  );

  return (
    <>
      <Button variant="tertiary" size="sm" onClick={() => setIsOpen(true)}>
        Disable
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Form form={form} onSubmit={onSubmit}>
            <Modal.Header
              title="Disable Two-Factor Authentication"
              description="To disable two-factor authentication, please enter your password."
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
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Form.SubmitButton
                size="sm"
                variant="danger"
                className="bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-red-700 active:bg-red-800"
                loading={isInFlight}
              >
                Disable
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    </>
  );
};

interface Props {
  me: SettingsTwoFactorAuthProviderCard_user$key;
}

const SettingsTwoFactorAuthProviderCard = ({ ...props }: Props) => {
  const me = useFragment(
    graphql`
      fragment SettingsTwoFactorAuthProviderCard_user on User {
        preferredProvider
        twoFactorEnabled
        twoFactorEnabledAt
      }
    `,
    props.me,
  );

  if (!me.twoFactorEnabled) return null;

  const isEmailPreferred = me.preferredProvider === 'EMAIL';

  return (
    <div className="flex flex-col justify-center rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5">
      <div className="flex items-center justify-between space-x-4 px-6 py-4">
        <div className="space-y-1">
          <FontAwesomeIcon
            icon={isEmailPreferred ? faEnvelope : faPhone}
            className="text-gray-500"
          />
          <Text as="span" weight="medium" className="ml-2">
            {isEmailPreferred ? 'Email' : 'Text Message (SMS)'}
          </Text>
          <Text>
            An authentication code will be sent to your{' '}
            {isEmailPreferred ? 'email address' : 'mobile phone'} when signing
            in to Spout.
          </Text>
        </div>
        <DisableTwoFactorAuthenticationModal />
      </div>
      <div className="flex items-center space-x-2 border-t-2 border-gray-100 bg-gray-50 px-6 py-4">
        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
        <Text as="span" size="sm">
          Verified on{' '}
          {format(new Date(me.twoFactorEnabledAt!), 'MMMM dd, yyyy')}
        </Text>
      </div>
    </div>
  );
};

export default SettingsTwoFactorAuthProviderCard;
