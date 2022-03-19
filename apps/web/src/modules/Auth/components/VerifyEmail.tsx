import { useCallback, useEffect, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { Title, Link, Button } from '@spout/toolkit';
import { useSession } from '../../../shared/components';
import EmailVerificationContainer, {
  EmailVerificationStatus,
} from './EmailVerificationContainer';
import { VerifyEmailMutation } from '../../../__generated__/VerifyEmailMutation.graphql';
import { VerifyEmailResendEmailMutation } from '../../../__generated__/VerifyEmailResendEmailMutation.graphql';

const resendEmailMutation = graphql`
  mutation VerifyEmailResendEmailMutation {
    generateEmailVerificationToken {
      authPayload {
        user {
          email
        }
      }
      errors {
        ... on EmailAlreadyVerifiedError {
          __typename
          message
        }
      }
    }
  }
`;

const verifyEmailMutation = graphql`
  mutation VerifyEmailMutation($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      errors {
        ... on InvalidTokenError {
          __typename
          message
        }
        ... on EmailAlreadyVerifiedError {
          __typename
          message
        }
      }
    }
  }
`;

const VerifyEmail = () => {
  const router = useRouter();
  const { sessionId } = useSession();
  const [status, setStatus] = useState<EmailVerificationStatus>({
    verifying: true,
    verified: false,
    expired: false,
    resentEmail: false,
  });

  const [verify] = useMutation<VerifyEmailMutation>(verifyEmailMutation);
  const [resendEmail, isInFlight] =
    useMutation<VerifyEmailResendEmailMutation>(resendEmailMutation);

  useEffect(() => {
    const token = router.query.token as string;

    verify({
      variables: { input: { token } },
      onCompleted: ({ verifyEmail: { errors } }) => {
        if (!errors) {
          setStatus({ verifying: false, verified: true, expired: false });
          router.replace('/home');
          return;
        }

        const error = errors[0];
        switch (error.__typename) {
          case 'EmailAlreadyVerifiedError':
            setStatus({ verifying: false, verified: true, expired: false });
            router.replace('/home');
            return;
          case 'InvalidTokenError':
            setStatus({ verifying: false, verified: false, expired: true });
            return;
          default:
            return;
        }
      },
      onError: (error) => {
        console.error(error);
        setStatus({ verifying: false, verified: false, expired: true });
      },
    });
  }, [verify, router.query.token, sessionId, router]);

  const resendVerificationEmail = useCallback(
    () =>
      resendEmail({
        variables: {},
        onCompleted: ({
          generateEmailVerificationToken: { authPayload, errors },
        }) => {
          if (errors) {
            // This means the user is already verified.
            router.replace('/home');
            return;
          }

          setStatus({
            verifying: false,
            verified: false,
            expired: true,
            resentEmail: true,
            resentEmailRecipient: authPayload?.user?.email,
          });
        },
        onError: (error) => {
          console.error(error);
        },
      }),
    [resendEmail, router],
  );

  return (
    <EmailVerificationContainer
      status={status}
      invalidTokenRenderer={() => (
        <>
          <Title as="h1" variant="h3">
            Email verification token has expired
          </Title>
          <Title as="h2" variant="h5" className="font-normal">
            Please resend a new verification email using the button below.
          </Title>
          <Button
            variant="primary"
            className="mt-8"
            onClick={resendVerificationEmail}
            loading={isInFlight}
            fullWidth
          >
            Resend Verification Email
          </Button>
          <Link
            href="/home"
            variant="secondary"
            className="mt-2"
            fullWidth
            replace
          >
            Home
          </Link>
        </>
      )}
    />
  );
};

export default VerifyEmail;
