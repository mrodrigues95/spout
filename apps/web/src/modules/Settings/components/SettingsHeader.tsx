import { gql, useMutation } from '@apollo/client';
import { Button } from '@spout/toolkit';
import { useAuthRedirect } from '../../Auth';
import {
  LogoutMutation,
  LogoutMutationVariables,
} from './__generated__/SettingsHeader.generated';

const mutation = gql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      authPayload {
        isLoggedIn
      }
    }
  }
`;

const SettingsHeader = () => {
  const authRedirect = useAuthRedirect();
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    mutation,
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
    <div className="flex items-center justify-between">
      <Button size="sm" variant="light" scheme="sky" onClick={removeSession}>
        Log Out
      </Button>
    </div>
  );
};

export default SettingsHeader;
