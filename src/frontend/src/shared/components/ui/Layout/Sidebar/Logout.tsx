import { gql, useMutation } from '@apollo/client';
import { useAuthRedirect } from '~/modules/Auth/hooks';
import { Button } from '~/shared/components';
import {
  LogoutMutation,
  LogoutMutationVariables,
} from './__generated__/Logout.generated';

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      isLoggedIn
    }
  }
`;

const Logout = () => {
  const authRedirect = useAuthRedirect();
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    LOGOUT_MUTATION,
    {
      onCompleted: authRedirect,
    }
  );

  const removeSession = async () => {
    const response = await fetch('/api/sessions/remove', {
      method: 'POST',
    });
    const sessionId = await response.json();
    logout({ variables: { input: { sessionId } } });
  };

  return (
    <Button
      size="xl"
      rounded="xxl"
      variant="ghost"
      scheme="light"
      fullWidth
      onClick={removeSession}
    >
      Logout
    </Button>
  );
};

export default Logout;
