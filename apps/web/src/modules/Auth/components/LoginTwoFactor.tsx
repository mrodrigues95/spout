import { useCallback, useEffect, useRef, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { Text, Title } from '@spout/toolkit';
import {
  OtpInput,
  OtpInputRef,
  OTP_LENGTH,
  useToast,
} from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks';
import { hidePhoneNumber } from '../../../shared/utils/mask';
import {
  useAuthRedirect,
  useInitializeIronSession,
  useSendTwoFactorCodeMutation,
} from '../hooks';
import AuthError from './AuthError';
import AuthContainer from './AuthContainer';
import { LoginTwoFactorVerifyTokenMutation } from './__generated__/LoginTwoFactorVerifyTokenMutation.graphql';

const mutation = graphql`
  mutation LoginTwoFactorVerifyTokenMutation(
    $input: VerifyTwoFactorTokenInput!
  ) {
    verifyTwoFactorToken(input: $input) {
      authPayload {
        isLoggedIn
        requiresTwoFactorLogin
        session {
          id
        }
      }
      errors {
        ... on LoginUserError {
          __typename
          message
        }
        ... on InvalidTokenError {
          __typename
          message
        }
      }
    }
  }
`;

interface Props {
  email: string | null;
  phoneNumber: string | null;
  resetLoginForm(): void;
}

const LoginTwoFactor = ({ email, phoneNumber, resetLoginForm }: Props) => {
  const ref = useRef<OtpInputRef>(null);
  const { handleError } = useToast();
  const [otp, setOtp] = useState('');
  const authRedirect = useAuthRedirect();
  const initSession = useInitializeIronSession();
  const isRedirecting = useIsRedirecting();
  const [verificationStatus, setVerificationStatus] = useState({
    isResendCodeError: false,
    isInvalidCode: false,
  });

  const [resendCode, isResendingCode] = useSendTwoFactorCodeMutation();
  const [verifyCode, isVerifyingCode] =
    useMutation<LoginTwoFactorVerifyTokenMutation>(mutation);

  const resetOtp = useCallback(() => {
    setOtp('');
    ref.current?.focusInput(0);
  }, []);

  useEffect(() => {
    if (otp.length === OTP_LENGTH) {
      verifyCode({
        variables: { input: { token: otp } },
        onError: () => {
          handleError();
          resetOtp();
        },
        onCompleted: ({ verifyTwoFactorToken: { errors, authPayload } }) => {
          if (errors) {
            const error = errors[0];
            switch (error.__typename) {
              case 'InvalidTokenError':
                resetOtp();
                setVerificationStatus({
                  isInvalidCode: true,
                  isResendCodeError: false,
                });
                return;
              case 'LoginUserError':
                resetLoginForm();
                return;
              default:
                return;
            }
          } else {
            initSession(authPayload!.session!.id).then(authRedirect);
          }
        },
      });
    }
  }, [
    authRedirect,
    handleError,
    initSession,
    resetOtp,
    resetLoginForm,
    otp,
    verifyCode,
  ]);

  return (
    <AuthContainer title="Two-Factor Authentication" width="xl">
      <div className="!-mt-6 mb-6 space-y-1 text-center">
        <Title as="h2" variant="h5" className="font-normal text-gray-700">
          This account is secured.
        </Title>
        <Title as="h3" variant="h5" className="font-normal text-gray-700">
          Please check your {phoneNumber ? 'mobile device' : 'email address'}:{' '}
          <b>{phoneNumber ? hidePhoneNumber(phoneNumber) : email}</b>
        </Title>
      </div>
      <div className="space-y-6">
        {verificationStatus.isInvalidCode && (
          <AuthError
            title="Verification failed"
            error={new Error('Invalid or expired authentication code.')}
          />
        )}
        <div>
          <Text className="-mb-4 text-left" weight="medium">
            Authentication code
          </Text>
          <OtpInput
            value={otp}
            ref={ref}
            onChange={(otp: string) => setOtp(otp)}
            numInputs={6}
            shouldAutoFocus
            isInputNum
            isDisabled={isVerifyingCode || isRedirecting}
            containerStyle="mt-6"
          >
            <OtpInput.Resend
              onResend={() =>
                resendCode({
                  onError: () => {
                    handleError();
                    setVerificationStatus({
                      isInvalidCode: false,
                      isResendCodeError: true,
                    });
                  },
                  onCompleted: (errors) => {
                    if (errors) resetLoginForm();
                  },
                })
              }
              shouldResetCountdown={verificationStatus.isResendCodeError}
              buttonProps={{
                loading: isResendingCode,
                disabled: isVerifyingCode || isRedirecting,
              }}
            />
          </OtpInput>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginTwoFactor;
