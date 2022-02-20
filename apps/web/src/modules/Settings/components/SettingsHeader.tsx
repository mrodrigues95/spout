import { graphql, useMutation } from 'react-relay';
import { Button } from '@spout/toolkit';
import { useAuthRedirect } from '../../Auth';
import { SettingsHeaderMutation } from '../../../__generated__/SettingsHeaderMutation.graphql';

const mutation = graphql`
  mutation SettingsHeaderMutation($input: LogoutInput!) {
    logout(input: $input) {
      authPayload {
        isLoggedIn
      }
    }
  }
`;

const SettingsHeader = () => {
  const authRedirect = useAuthRedirect();
  const [logout] = useMutation<SettingsHeaderMutation>(mutation);

  const removeSession = async () => {
    const response = await fetch('/api/sessions/remove', {
      method: 'POST',
    });
    const sessionId = await response.json();
    logout({ variables: { input: { sessionId } }, onCompleted: authRedirect });
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
