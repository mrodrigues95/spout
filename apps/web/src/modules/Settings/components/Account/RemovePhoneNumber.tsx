import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { Alert, Button, Modal, Text } from '@spout/toolkit';
import { useModalStepper, useTimeout } from '../../../../shared/hooks';
import { useSession, useToast } from '../../../../shared/components';
import VerifyPasswordModal from './VerifyPasswordModal';
import { RemovePhoneNumber_user$key } from './__generated__/RemovePhoneNumber_user.graphql';
import { RemovePhoneNumberVerifyPhoneRemovalModal_user$key } from './__generated__/RemovePhoneNumberVerifyPhoneRemovalModal_user.graphql';
import { RemovePhoneNumberMutation } from './__generated__/RemovePhoneNumberMutation.graphql';

interface VerifyPhoneRemovalModalProps {
  me: RemovePhoneNumberVerifyPhoneRemovalModal_user$key;
  closeModal(): void;
}

const VerifyPhoneRemovalModal = ({
  closeModal,
  ...props
}: VerifyPhoneRemovalModalProps) => {
  const router = useRouter();
  const { sessionId } = useSession();
  const { handleError } = useToast();

  const me = useFragment(
    graphql`
      fragment RemovePhoneNumberVerifyPhoneRemovalModal_user on User {
        preferredProvider
        twoFactorEnabled
        phoneNumber
      }
    `,
    props.me,
  );

  const [removePhoneNumber, isInFlight] =
    useMutation<RemovePhoneNumberMutation>(graphql`
      mutation RemovePhoneNumberMutation($input: RemovePhoneNumberInput!) {
        removePhoneNumber(input: $input) {
          authPayload {
            user {
              phoneNumber
              phoneNumberConfirmed
              preferredProvider
              twoFactorEnabled
              twoFactorEnabledAt
            }
          }
          errors {
            ... on SessionExpiredError {
              message
            }
          }
        }
      }
    `);

  return (
    <>
      <Modal.Header
        title="Remove your phone number"
        description="This will reduce the level of security for your Spout account."
      />
      <Modal.Body>
        {me.twoFactorEnabled && me.preferredProvider === 'PHONE' && (
          <Alert
            severity="warning"
            title="Two-factor authentication"
            description="Two-factor authentication is currently enabled through Text Message
                (SMS). Removing your phone number will also result in two-factor
                authentication being disabled for this account."
          />
        )}
        <Text>
          Your phone number: <b>{me.phoneNumber}</b>
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button size="sm" variant="tertiary" onClick={close}>
          Cancel
        </Button>
        <Button
          size="sm"
          variant="danger"
          className="bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-red-700 active:bg-red-800"
          loading={isInFlight}
          onClick={() =>
            removePhoneNumber({
              variables: { input: { sessionId: sessionId! } },
              onError: () => handleError(),
              onCompleted: ({ removePhoneNumber: { errors } }) => {
                if (errors) {
                  router.replace('/auth/login');
                } else {
                  closeModal();
                }
              },
            })
          }
        >
          Remove
        </Button>
      </Modal.Footer>
    </>
  );
};

interface Props {
  me: RemovePhoneNumber_user$key;
}

const RemovePhoneNumber = ({ ...props }: Props) => {
  const me = useFragment(
    graphql`
      fragment RemovePhoneNumber_user on User {
        ...RemovePhoneNumberVerifyPhoneRemovalModal_user
      }
    `,
    props.me,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { timeout } = useTimeout();

  const onClose = useCallback(() => {
    setIsOpen(false);
    timeout(() => setCurrentStep(1), 500);
  }, [timeout]);

  const { currentModalStep } = useModalStepper({
    currentStep,
    modals: [
      {
        modal: (
          <VerifyPasswordModal
            onPasswordVerified={() => setCurrentStep(2)}
            closeModal={onClose}
          />
        ),
        step: 1,
      },
      {
        modal: <VerifyPhoneRemovalModal me={me} closeModal={onClose} />,
        step: 2,
      },
    ],
  });

  return (
    <>
      <Button
        variant="tertiary"
        className="mr-3"
        onClick={() => setIsOpen(true)}
      >
        Remove
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>{currentModalStep}</Modal.Content>
      </Modal>
    </>
  );
};

export default RemovePhoneNumber;
