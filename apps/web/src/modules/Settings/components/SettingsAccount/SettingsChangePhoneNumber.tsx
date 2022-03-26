import { useCallback, useEffect, useRef, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { PhoneNumber } from 'libphonenumber-js';
import { Button, Title, Text, Modal } from '@spout/toolkit';
import {
  PhoneVerificationInput,
  useSendPhoneVerificationTokenMutation,
  useSession,
  useToast,
  OtpInput,
  OtpInputRef,
  OTP_LENGTH,
} from '../../../../shared/components';
import { useTimeout } from '../../../../shared/hooks';
import SettingsRemovePhoneNumber from './SettingsRemovePhoneNumber';
import { SettingsChangePhoneNumberMutation } from '../../../../__generated__/SettingsChangePhoneNumberMutation.graphql';
import { SettingsChangePhoneNumber_user$key } from '../../../../__generated__/SettingsChangePhoneNumber_user.graphql';

interface EnterVerificationCodeModalProps {
  phoneNumber: PhoneNumber;
  onChangePhoneNumberSuccess(): void;
}

const EnterVerificationCodeModal = ({
  phoneNumber,
  onChangePhoneNumberSuccess,
}: EnterVerificationCodeModalProps) => {
  const [changePhoneNumber, isChangingPhoneNumber] =
    useMutation<SettingsChangePhoneNumberMutation>(graphql`
      mutation SettingsChangePhoneNumberMutation(
        $input: ChangePhoneNumberInput!
      ) {
        changePhoneNumber(input: $input) {
          authPayload {
            user {
              phoneNumber
              phoneNumberConfirmed
            }
          }
          errors {
            ... on InvalidTokenError {
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
    `);

  const [sendCode, isSendingCode, isSendingCodeError] =
    useSendPhoneVerificationTokenMutation();

  const router = useRouter();
  const ref = useRef<OtpInputRef>(null);
  const { sessionId } = useSession();
  const { handleError } = useToast();
  const [otp, setOtp] = useState('');
  const [isInvalidVerificationCode, setIsInvalidVerificationCode] =
    useState(false);

  const resetOtp = useCallback(() => {
    setOtp('');
    ref.current?.focusInput(0);
  }, []);

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      changePhoneNumber({
        variables: { input: { sessionId: sessionId!, token: otp } },
        onError: () => {
          handleError();
          resetOtp();
        },
        onCompleted: ({ changePhoneNumber: { errors } }) => {
          if (!errors) {
            onChangePhoneNumberSuccess();
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            case 'InvalidTokenError':
              setIsInvalidVerificationCode(true);
              resetOtp();
              return;
            case 'SessionExpiredError':
              router.replace('/auth/login');
              return;
            default:
              return;
          }
        },
      });
    }
  }, [
    changePhoneNumber,
    otp,
    sessionId,
    resetOtp,
    router,
    handleError,
    onChangePhoneNumberSuccess,
  ]);

  return (
    <>
      <Modal.Header
        title="Enter six digit verification code"
        description={`A verification code has been sent to ${phoneNumber.number}.`}
        dismiss={false}
      />
      <Modal.Body>
        {isInvalidVerificationCode && (
          <Text
            size="sm"
            className="text-center font-medium italic text-red-600"
          >
            Invalid or expired verification code.
          </Text>
        )}
        <OtpInput
          value={otp}
          ref={ref}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={6}
          shouldAutoFocus
          isInputNum
          isDisabled={isChangingPhoneNumber}
        >
          <OtpInput.Resend
            onResend={() => sendCode({ phoneNumber })}
            shouldResetCountdown={isSendingCodeError}
            buttonProps={{
              loading: isSendingCode,
              disabled: isChangingPhoneNumber,
            }}
          />
        </OtpInput>
      </Modal.Body>
    </>
  );
};

interface EnterPhoneNumberModalProps {
  setPhoneNumber(phoneNumber: PhoneNumber): void;
}

const EnterPhoneNumberModal = ({
  setPhoneNumber,
}: EnterPhoneNumberModalProps) => {
  const onVerificationTokenSent = useCallback(
    (phoneNumber: PhoneNumber) => setPhoneNumber(phoneNumber),
    [setPhoneNumber],
  );

  return (
    <>
      <Modal.Header
        title="Add a Phone Number"
        description="Your phone number can be used to log in and enable two-factor authentication."
      />
      <Modal.Body>
        <Text className="mb-2">
          You must use a mobile phone number. Landline and VOIP numbers cannot
          be used.
        </Text>
        <PhoneVerificationInput
          onVerificationTokenSent={onVerificationTokenSent}
        />
      </Modal.Body>
    </>
  );
};

interface Props {
  me: SettingsChangePhoneNumber_user$key;
}

const SettingsChangePhoneNumber = ({ ...props }: Props) => {
  const me = useFragment(
    graphql`
      fragment SettingsChangePhoneNumber_user on User {
        phoneNumber
        phoneNumberConfirmed
        ...SettingsRemovePhoneNumber_user
      }
    `,
    props.me,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | null>(null);
  const { timeout } = useTimeout();

  const onClose = useCallback(() => {
    setIsOpen(false);
    timeout(() => setPhoneNumber(null), 500);
  }, [timeout]);

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <Title as="h2" variant="h5" className="font-medium">
          Phone Number
        </Title>
        <Text size="sm">
          {me.phoneNumberConfirmed
            ? me.phoneNumber
            : 'There is currently no phone number associated with your account.'}
        </Text>
      </div>
      {me.phoneNumberConfirmed && <SettingsRemovePhoneNumber me={me} />}
      <Button onClick={() => setIsOpen(true)}>
        {me.phoneNumberConfirmed ? 'Edit' : 'Add'}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content className="w-[18rem] sm:w-[30rem]">
          {phoneNumber ? (
            <EnterVerificationCodeModal
              phoneNumber={phoneNumber}
              onChangePhoneNumberSuccess={onClose}
            />
          ) : (
            <EnterPhoneNumberModal setPhoneNumber={setPhoneNumber} />
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default SettingsChangePhoneNumber;
