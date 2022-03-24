import { useCallback, useEffect, useRef, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { PhoneNumber } from 'libphonenumber-js';
import OtpInput from 'react-otp-input';
import clsx from 'clsx';
import { Button, Title, Text, Modal, Spinner } from '@spout/toolkit';
import {
  PhoneVerificationInput,
  useSendPhoneVerificationTokenMutation,
  useSession,
  useToast,
} from '../../../../shared/components';
import { useCountdown, useTimeout } from '../../../../shared/hooks';
import { SettingsChangePhoneNumberMutation } from '../../../../__generated__/SettingsChangePhoneNumberMutation.graphql';
import { SettingsChangePhoneNumber_user$key } from '../../../../__generated__/SettingsChangePhoneNumber_user.graphql';

const OTP_LENGTH = 6;

const mutation = graphql`
  mutation SettingsChangePhoneNumberMutation($input: ChangePhoneNumberInput!) {
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
`;

interface EnterVerificationCodeModalProps {
  phoneNumber: PhoneNumber;
  onChangePhoneNumberSuccess(): void;
}

const EnterVerificationCodeModal = ({
  phoneNumber,
  onChangePhoneNumberSuccess,
}: EnterVerificationCodeModalProps) => {
  const [changePhoneNumber, isChangingPhoneNumber] =
    useMutation<SettingsChangePhoneNumberMutation>(mutation);
  const [sendCode, isSendingCode] = useSendPhoneVerificationTokenMutation();

  const router = useRouter();
  const otpInputRef = useRef<OtpInput>(null);
  const { sessionId } = useSession();
  const { handleError } = useToast();
  const [otp, setOtp] = useState('');
  const [isInvalidVerificationCode, setIsInvalidVerificationCode] =
    useState(false);
  const [count, { start, reset, isCountingDown }] = useCountdown({
    initialCount: 60,
    interval: 1000,
    resetAtZero: true,
  });

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      changePhoneNumber({
        variables: { input: { sessionId: sessionId!, token: otp } },
        onError: handleError,
        onCompleted: ({ changePhoneNumber: { errors } }) => {
          if (!errors) {
            setIsInvalidVerificationCode(false);
            setOtp('');
            onChangePhoneNumberSuccess();
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            case 'InvalidTokenError':
              setIsInvalidVerificationCode(true);
              setOtp('');
              otpInputRef.current?.focusInput(0);
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
    router,
    handleError,
    onChangePhoneNumberSuccess,
  ]);

  console.log(otpInputRef);

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
          ref={otpInputRef}
          onChange={(otp: string) => setOtp(otp)}
          numInputs={OTP_LENGTH}
          shouldAutoFocus
          isInputNum
          isDisabled={isChangingPhoneNumber}
          containerStyle="flex items-center justify-center w-full space-x-2.5 mb-2"
          inputStyle={clsx(
            '!w-11 !h-11 text-center p-0 w-full rounded-lg border-2 border-transparent bg-gray-100 font-medium outline-none ring-offset-4',
            'disabled:opacity-60',
            'focus:border-blue-700 focus:ring-4 focus:ring-blue-200',
          )}
        />
        <div className="space-x-2 text-center">
          <Text as="span" size="sm">
            Didn&apos;t receive it?
          </Text>
          <Button
            size="xs"
            onClick={() => {
              sendCode({ phoneNumber, onError: reset });
              start();
            }}
            disabled={isChangingPhoneNumber || isCountingDown}
            loading={isSendingCode}
            spinner={<Spinner variant="circle" scheme="black" size="xs" />}
          >
            {isCountingDown ? count : 'Resend Code'}
          </Button>
        </div>
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

const fragment = graphql`
  fragment SettingsChangePhoneNumber_user on User {
    phoneNumber
    phoneNumberConfirmed
  }
`;

interface Props {
  me: SettingsChangePhoneNumber_user$key;
}

const SettingsChangePhoneNumber = ({ ...props }: Props) => {
  const me = useFragment(fragment, props.me);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber | null>(null);
  const { timeout } = useTimeout();

  const onClose = useCallback(() => {
    setIsOpen(false);
    timeout(() => setPhoneNumber(null), 500);
  }, [timeout]);

  // TODO: Implement removing phone numbers.
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
      <Button onClick={() => setIsOpen(true)}>
        {me.phoneNumberConfirmed ? 'Change Phone Number' : 'Add Phone Number'}
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
