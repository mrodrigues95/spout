import { ReactNode } from 'react';
import {
  faCheckCircle,
  faEnvelopeOpenText,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Spinner, Title } from '@spout/toolkit';
import { Layout } from '../../../shared/components';

export interface EmailVerificationStatus {
  verifying: boolean;
  verified: boolean;
  expired: boolean;
  resentEmail?: boolean;
  resentEmailRecipient?: string;
}

interface Props {
  status: EmailVerificationStatus;
  invalidTokenRenderer(): ReactNode;
}

const EmailVerificationContainer = ({
  status,
  invalidTokenRenderer,
}: Props) => {
  return (
    <Layout title="Verify" authenticated={false}>
      <div className="mx-auto flex w-full max-w-lg flex-1 items-center justify-center">
        <div className="flex w-[32rem] flex-col items-center rounded-lg p-6 text-center">
          {status.verifying && (
            <>
              <Spinner scheme="blue" className="mb-4" size="lg" />
              <Title as="h1" variant="h3">
                Verifying email...
              </Title>
            </>
          )}
          {status.verified && (
            <>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="3x"
                className="mb-4 text-green-500"
              />
              <Title as="h1" variant="h3">
                Verified!
              </Title>
              <Title as="h2" variant="h5" className="font-normal">
                Redirecting you...
              </Title>
            </>
          )}
          {status.expired && !status.resentEmail && (
            <>
              <FontAwesomeIcon
                icon={faEnvelopeOpenText}
                size="3x"
                className="mb-4 text-gray-900"
              />
              {invalidTokenRenderer()}
            </>
          )}
          {status.expired && status.resentEmail && (
            <>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="3x"
                className="mb-4 text-green-500"
              />
              <Title as="h1" variant="h3">
                Verification email has been sent!
              </Title>
              <Title as="h2" variant="h5" className="font-normal">
                An email has been sent to {status.resentEmailRecipient}. Please
                check your inbox for the link.
              </Title>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default EmailVerificationContainer;
