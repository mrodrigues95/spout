import { graphql, useMutation } from 'react-relay';
import { useResendVerificationEmailMutation } from '../../../../../__generated__/useResendVerificationEmailMutation.graphql';

const mutation = graphql`
  mutation useResendVerificationEmailMutation {
    generateEmailVerificationToken {
      authPayload {
        isLoggedIn
      }
    }
  }
`;

export const useResendVerificationEmail = () => {
  const [commit, isInFlight] =
    useMutation<useResendVerificationEmailMutation>(mutation);

  return [commit, isInFlight] as const;
};
