import { gql, useMutation } from '@apollo/client';
import { Button } from '@spout/toolkit';
import { LogoutIcon } from '@spout/assets/icons/outline';
import { useAuthRedirect } from '../../../../../modules';
import { useMediaQuery, MEDIA_QUERIES } from '../../../../hooks';
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
  const isXL = useMediaQuery(MEDIA_QUERIES.XL);
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
      className="!font-bold"
      size={isXL ? 'xl' : 'sm'}
      rounded="xl"
      scheme="gray"
      variant="ghost"
      fullWidth
      onClick={removeSession}
    >
      {isXL ? 'Logout' : <LogoutIcon className="w-8 h-8" />}
    </Button>
  );
};

export default Logout;
