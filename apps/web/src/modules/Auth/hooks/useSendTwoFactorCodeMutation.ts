import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useSendTwoFactorCodeMutation as TMutation } from './__generated__/useSendTwoFactorCodeMutation.graphql';

const mutation = graphql`
  mutation useSendTwoFactorCodeMutation {
    generateTwoFactorToken {
      authPayload {
        isLoggedIn
        requiresTwoFactorLogin
      }
      errors {
        ... on Error {
          message
        }
      }
    }
  }
`;

export const useSendTwoFactorCodeMutation = () => {
  const [commit, isInFlight] = useMutation<TMutation>(mutation);

  const sendCode = useCallback(
    ({
      onCompleted,
      onError,
    }: {
      onCompleted?: (errors?: boolean) => void;
      onError?: () => void;
    }) =>
      commit({
        variables: {},
        onError: onError,
        onCompleted: ({ generateTwoFactorToken: { errors } }) => {
          if (errors) {
            console.error(
              'Unexpected error while attempting to resend two-factor authentication code',
            );
            if (onCompleted) onCompleted(true);
          } else {
            if (onCompleted) onCompleted(false);
          }
        },
      }),
    [commit],
  );

  return [sendCode, isInFlight] as const;
};
