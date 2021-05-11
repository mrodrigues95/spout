import { object, string } from 'zod';
import { gql, useMutation } from '@apollo/client';
import {
  Button,
  Link,
  Input,
  Form,
  useZodForm,
  PrimaryLayout,
} from '~/shared/components';
import AuthCard from '../AuthCard';
import AuthError from '../AuthError';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import {
  LoginMutation,
  LoginMutationVariables,
} from './__generated__/index.generated';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      session {
        id
      }
      userErrors {
        message
        code
      }
    }
  }
`;

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
});

const LoginForm = () => {
  const authRedirect = useAuthRedirect();
  const [login, loginResult] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    async onCompleted({ login }) {
      if (!login.userErrors) {
        await fetch('/api/sessions/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(login.session?.id),
        });
        authRedirect();
      }
    },
    onError: (error) => console.log(error.message),
  });

  const form = useZodForm({
    schema: loginSchema,
  });

  const signUpLink = (
    <Link
      href="/auth/signup"
      className="text-green-600 font-semibold focus:outline-none focus:underline hover:underline"
      preserveRedirect
    >
      Sign up.
    </Link>
  );

  return (
    <PrimaryLayout title="Login">
      <AuthCard
        title="Welcome back!"
        subtitle="Use the form below to login"
        action={{
          description: "Don't have an account?",
          link: signUpLink,
        }}
      >
        <Form
          form={form}
          onSubmit={({ email, password }) => {
            login({
              variables: { input: { email, password } },
            });
          }}
          className="flex flex-col w-full"
        >
          <AuthError
            title="Login failed."
            error={
              loginResult.error || loginResult.data?.login.userErrors?.shift()
            }
          />
          <Input
            label="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            autoFocus
            {...form.register('email')}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            {...form.register('password')}
          />
          <p className="font-semibold">Forgot your password?</p>
          <Button type="submit">Login</Button>
        </Form>
      </AuthCard>
    </PrimaryLayout>
  );
};

export default LoginForm;
