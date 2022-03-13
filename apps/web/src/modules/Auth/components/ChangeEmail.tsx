import { useEffect, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import { Title, Link } from '@spout/toolkit';
import { useSession } from '../../../shared/components';
import EmailVerificationContainer, {
  EmailVerificationStatus,
} from './EmailVerificationContainer';
import { ChangeEmailMutation } from '../../../__generated__/ChangeEmailMutation.graphql';

const mutation = graphql`
  mutation ChangeEmailMutation($input: ChangeEmailInput!) {
    changeEmail(input: $input) {
      errors {
        ... on InvalidTokenError {
          message
        }
      }
    }
  }
`;

const ChangeEmail = () => {
  const router = useRouter();
  const { sessionId } = useSession();
  const [changeEmail] = useMutation<ChangeEmailMutation>(mutation);
  const [status, setStatus] = useState<EmailVerificationStatus>({
    verifying: true,
    verified: false,
    expired: false,
  });

  useEffect(() => {
    const token = router.query.token as string;

    changeEmail({
      variables: {
        input: { token, sessionId: sessionId! },
      },
      onCompleted: ({ changeEmail: { errors } }) => {
        if (errors) {
          setStatus({ verifying: false, verified: false, expired: true });
        } else {
          setStatus({ verifying: false, verified: true, expired: false });
          router.replace('/home');
        }
      },
      onError: (error) => {
        console.error(error);
        setStatus({ verifying: false, verified: false, expired: true });
      },
    });
  }, [changeEmail, router.query.token, sessionId, router]);

  return (
    <EmailVerificationContainer
      status={status}
      invalidTokenRenderer={() => (
        <>
          <Title as="h1" variant="h3">
            Email verification token has expired
          </Title>
          <Title as="h2" variant="h5" className="font-normal">
            Please request another email change.
          </Title>
          <Link
            href="/settings"
            variant="primary"
            className="mt-4"
            fullWidth
            replace
          >
            Settings
          </Link>
        </>
      )}
    />
  );
};

export default ChangeEmail;
