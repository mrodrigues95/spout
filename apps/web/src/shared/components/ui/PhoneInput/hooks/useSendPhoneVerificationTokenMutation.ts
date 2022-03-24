import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import { PhoneNumber } from 'libphonenumber-js';
import useToast from '../../Toast';
import { useSendPhoneVerificationTokenMutation as TMutation } from '../../../../../__generated__/useSendPhoneVerificationTokenMutation.graphql';

const mutation = graphql`
  mutation useSendPhoneVerificationTokenMutation(
    $input: GenerateChangePhoneNumberTokenInput!
  ) {
    generateChangePhoneNumberToken(input: $input) {
      errors {
        ... on InvalidPhoneNumberError {
          __typename
          message
        }
        ... on SMSNotSentError {
          __typename
          message
        }
      }
    }
  }
`;

export const useSendPhoneVerificationTokenMutation = () => {
  const [generateToken, isInFlight] = useMutation<TMutation>(mutation);
  const { handleError } = useToast();

  const sendPhoneVerificationToken = useCallback(
    ({
      phoneNumber,
      onSuccess,
      onError,
      onInvalidPhoneNumber,
    }: {
      phoneNumber: PhoneNumber;
      onSuccess?: () => void;
      onError?: () => void;
      onInvalidPhoneNumber?: () => void;
    }) =>
      generateToken({
        variables: {
          input: {
            phoneNumber: phoneNumber.number,
            countryCode: phoneNumber.country!,
          },
        },
        onError: () => {
          handleError();
          if (onError) onError();
        },
        onCompleted: ({ generateChangePhoneNumberToken: { errors } }) => {
          if (!errors) {
            if (onSuccess) onSuccess();
            return;
          }

          const error = errors[0];
          switch (error.__typename) {
            case 'InvalidPhoneNumberError':
              if (onInvalidPhoneNumber) onInvalidPhoneNumber();
              return;
            case 'SMSNotSentError':
              handleError();
              return;
            default:
              return;
          }
        },
      }),
    [generateToken, handleError],
  );

  return [sendPhoneVerificationToken, isInFlight] as const;
};
