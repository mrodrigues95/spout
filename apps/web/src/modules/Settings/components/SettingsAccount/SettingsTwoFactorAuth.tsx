import { useCallback, useMemo, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useController } from 'react-hook-form';
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Zod, { object, string } from 'zod';
import clsx from 'clsx';
import { Alert, Button, Form, Modal, useZodForm, Text } from '@spout/toolkit';
import { useToast, useSession } from '../../../../shared/components';
import {
  MEDIA_QUERIES,
  useMediaQuery,
  useModalStepper,
  useTimeout,
} from '../../../../shared/hooks';
import SettingsTwoFactorAuthProviderCard from './SettingsTwoFactorAuthProviderCard';
import SettingsVerifyPasswordModal from './SettingsVerifyPasswordModal';
import { SettingsTwoFactorAuthEnableTwoFactorMutation } from '../../../../__generated__/SettingsTwoFactorAuthEnableTwoFactorMutation.graphql';
import { SettingsTwoFactorAuth_user$key } from '../../../../__generated__/SettingsTwoFactorAuth_user.graphql';
import { SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$key } from '../../../../__generated__/SettingsTwoFactorAuthChooseTwoFactorProviderModal_user.graphql';
import { SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$key } from '../../../../__generated__/SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user.graphql';

interface TwoFactorSuccessfullyEnabledModalProps {
  me: SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user$key;
  closeModal(): void;
}

const TwoFactorSuccessfullyEnabledModal = ({
  closeModal,
  ...props
}: TwoFactorSuccessfullyEnabledModalProps) => {
  const me = useFragment(
    graphql`
      fragment SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user on User {
        email
        phoneNumber
        preferredProvider
      }
    `,
    props.me,
  );

  const isEmailPreferred = me.preferredProvider === 'EMAIL';

  return (
    <>
      <Modal.Header title="Two-Factor Authentication Enabled" />
      <Modal.Body className="text-center">
        <div className="space-y-1">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500"
            size="2x"
          />
          <Text className="text-center text-green-700">
            Successfully enabled
          </Text>
        </div>
        <div className="space-y-1">
          <Text size="sm">
            Your current {isEmailPreferred ? 'email' : 'phone number'} is set to{' '}
            <span className="font-medium">
              {isEmailPreferred ? me.email : me.phoneNumber}
            </span>
            .
          </Text>
          <Text size="sm">
            Authentication codes will be sent to this{' '}
            {isEmailPreferred ? 'email address' : 'phone number'} when signing
            in to Spout.
          </Text>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="primary" onClick={closeModal}>
          OK
        </Button>
      </Modal.Footer>
    </>
  );
};

const twoFactorSchema = object({
  provider: string().nonempty(),
});

interface ChooseTwoFactorProviderModalProps {
  me: SettingsTwoFactorAuthChooseTwoFactorProviderModal_user$key;
  onTwoFactorEnabled(): void;
  closeModal(): void;
}

const ChooseTwoFactorProviderModal = ({
  onTwoFactorEnabled,
  closeModal,
  ...props
}: ChooseTwoFactorProviderModalProps) => {
  const router = useRouter();
  const { handleError } = useToast();
  const { sessionId } = useSession();

  const me = useFragment(
    graphql`
      fragment SettingsTwoFactorAuthChooseTwoFactorProviderModal_user on User {
        emailConfirmed
        phoneNumberConfirmed
      }
    `,
    props.me,
  );

  const [enableTwoFactor, isInFlight] =
    useMutation<SettingsTwoFactorAuthEnableTwoFactorMutation>(graphql`
      mutation SettingsTwoFactorAuthEnableTwoFactorMutation(
        $input: EnableTwoFactorInput!
      ) {
        enableTwoFactor(input: $input) {
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

  const twoFactorOptions = useMemo(
    () => [
      {
        name: 'Text Message (SMS)',
        description:
          'Use your mobile phone to receive an authentication code that you can use when signing in to Spout.',
        value: 'sms',
        disabled: !me.phoneNumberConfirmed,
      },
      {
        name: 'Email',
        description:
          'Use your email to receive an authentication code that you can use when signing in to Spout.',
        value: 'email',
        disabled: !me.emailConfirmed,
      },
    ],
    [me],
  );

  const form = useZodForm({
    schema: twoFactorSchema,
    defaultValues: {
      provider: me.phoneNumberConfirmed
        ? twoFactorOptions[0].value
        : twoFactorOptions[1].value,
    },
  });

  const {
    field: { onChange, value },
  } = useController({
    name: 'provider',
    control: form.control,
  });

  const onSubmit = useCallback(
    ({ provider }: Zod.infer<typeof twoFactorSchema>) => {
      enableTwoFactor({
        variables: {
          input: {
            provider: provider === 'email' ? 'EMAIL' : 'PHONE',
            sessionId: sessionId!,
          },
        },
        onError: () => handleError(),
        onCompleted: ({ enableTwoFactor: { errors } }) => {
          if (!errors) {
            onTwoFactorEnabled();
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            // These first two errors should never happen unless there's a logical
            // error somewhere meaning a user is allowed to select a provider
            // that they are not verified for.
            case 'UnverifiedUserException':
              console.error(
                'Unsuccessfully enabled two-factor authn for an unverified user.',
              );
              handleError();
              return;
            case 'InvalidProviderException':
              console.error('Invalid provider selected for user.');
              handleError();
              return;
            case 'SessionExpiredError':
              router.replace('/auth/login');
              return;
            default:
              return;
          }
        },
      });
    },
    [enableTwoFactor, handleError, sessionId, onTwoFactorEnabled, router],
  );

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Modal.Header
        title="Set up Two-Factor Authentication"
        description="Choose from one of the authentication methods below."
      />
      <Modal.Body className="!space-y-6">
        {(!me.phoneNumberConfirmed || !me.emailConfirmed) && (
          <>
            <Alert
              severity="info"
              title={
                !me.phoneNumberConfirmed
                  ? 'Unverified phone number'
                  : 'Unverified email'
              }
              description={
                !me.phoneNumberConfirmed
                  ? 'Your phone number is unverified which means two-factor authentication can only be enabled for your email address at this moment.'
                  : 'Your email address is unverified which means two-factor authentication can only be enabled for SMS at this moment.'
              }
            />
            <div className="mx-auto w-2/4 border-t-2 border-gray-200 text-center"></div>
          </>
        )}
        <RadioGroup value={value} onChange={onChange}>
          <RadioGroup.Label className="sr-only">
            Two-Factor Authentication method
          </RadioGroup.Label>
          <div className="space-y-2.5">
            {twoFactorOptions.map((opt) => (
              <RadioGroup.Option
                key={opt.name}
                value={opt.value}
                disabled={opt.disabled}
                className={({ active, checked }) =>
                  clsx(
                    'relative flex cursor-pointer select-none rounded-lg border-2 border-transparent px-5 py-4',
                    'focus:outline-none',
                    active && 'border-blue-700 ring-4 ring-blue-200',
                    checked && 'border-blue-700 bg-blue-50/75',
                    opt.disabled
                      ? 'cursor-auto opacity-60'
                      : 'cursor-pointer opacity-100',
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between space-x-4">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={clsx(
                              'font-semibold',
                              checked ? 'text-gray-900' : 'text-gray-500',
                            )}
                          >
                            {opt.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={clsx(
                              checked ? 'text-gray-700' : 'text-gray-500',
                            )}
                          >
                            {opt.description}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="flex-shrink-0 text-blue-700"
                          size="lg"
                        />
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
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
          Enable
        </Form.SubmitButton>
      </Modal.Footer>
    </Form>
  );
};

interface Props {
  me: SettingsTwoFactorAuth_user$key;
}

const SettingsTwoFactorAuth = ({ ...props }: Props) => {
  const me = useFragment(
    graphql`
      fragment SettingsTwoFactorAuth_user on User {
        emailConfirmed
        phoneNumberConfirmed
        twoFactorEnabled
        ...SettingsTwoFactorAuthChooseTwoFactorProviderModal_user
        ...SettingsTwoFactorAuthTwoFactorSuccessfullyEnabledModal_user
        ...SettingsTwoFactorAuthProviderCard_user
      }
    `,
    props.me,
  );
  const [isOpen, setIsOpen] = useState(false);
  const { timeout } = useTimeout();
  const [currentStep, setCurrentStep] = useState(1);
  const isTablet = useMediaQuery(MEDIA_QUERIES.LARGE);

  const onClose = useCallback(() => {
    setIsOpen(false);
    timeout(() => setCurrentStep(1), 500);
  }, [timeout]);

  const { currentModalStep } = useModalStepper({
    currentStep,
    modals: [
      {
        modal: (
          <SettingsVerifyPasswordModal
            onPasswordVerified={() => setCurrentStep(2)}
            closeModal={onClose}
          />
        ),
        step: 1,
      },
      {
        modal: (
          <ChooseTwoFactorProviderModal
            me={me}
            onTwoFactorEnabled={() => setCurrentStep(3)}
            closeModal={onClose}
          />
        ),
        step: 2,
      },
      {
        modal: (
          <TwoFactorSuccessfullyEnabledModal me={me} closeModal={onClose} />
        ),
        step: 3,
      },
    ],
  });

  const isConfirmed = me.emailConfirmed || me.phoneNumberConfirmed;
  const description = me.twoFactorEnabled
    ? 'Your account is protected.'
    : isConfirmed
    ? "Protect your account by adding an extra layer of security. Once configured, you'll need your password and an authentication code to sign in."
    : 'You must verify your email address or phone number before you can enable two-factor authentication.';

  return (
    <div>
      <div className="mt-5 space-y-6">
        <Alert
          severity={me.twoFactorEnabled ? 'success' : 'info'}
          title={
            me.twoFactorEnabled
              ? 'Two-factor authentication is enabled'
              : 'Two-factor authentication is not yet enabled'
          }
          description={description}
        />
        <SettingsTwoFactorAuthProviderCard me={me} />
        {(me.twoFactorEnabled || isConfirmed) && (
          <Button
            variant={me.twoFactorEnabled ? 'default' : 'primary'}
            size={isTablet ? 'md' : 'sm'}
            className="ml-auto block"
            onClick={() => setIsOpen(true)}
          >
            {me.twoFactorEnabled ? 'Edit' : 'Enable Two-Factor Auth'}
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>{currentModalStep}</Modal.Content>
      </Modal>
    </div>
  );
};

export default SettingsTwoFactorAuth;
