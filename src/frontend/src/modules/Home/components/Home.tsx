import { gql, useMutation } from '@apollo/client';
import { useAuthRedirect } from '~/modules';
import {
  LogoutMutation,
  LogoutMutationVariables,
} from './__generated__/Home.generated';

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      isLoggedIn
    }
  }
`;

const Home = () => {
  const authRedirect = useAuthRedirect();
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    LOGOUT_MUTATION,
    {
      async onCompleted() {
        authRedirect();
      },
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
    <div>
      <h1>HOME</h1>
      <button type="button" onClick={() => removeSession()}>
        Logout
      </button>
    </div>
  );
};

export default Home;
