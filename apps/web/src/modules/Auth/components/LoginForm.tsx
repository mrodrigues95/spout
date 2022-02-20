import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, useZodForm, Link } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import { useAuthRedirect, useInitializeIronSession } from '../hooks';
import AuthCard from './AuthCard';
import AuthError from './AuthError';
import { LoginFormMutation } from '../../../__generated__/LoginFormMutation.graphql';

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
});

const mutation = graphql`
  mutation LoginFormMutation($input: LoginInput!) {
    login(input: $input) {
      authPayload {
        session {
          id
        }
      }
      errors {
        ... on LoginUserError {
          message
        }
      }
    }
  }
`;

const LoginForm = () => {
  const authRedirect = useAuthRedirect();
  const isRedirecting = useIsRedirecting();
  const init = useInitializeIronSession();
  const [loginError, setLoginError] = useState<Error>();
  const { handleError } = useToast();
  const [login, isInFlight] = useMutation<LoginFormMutation>(mutation);

  const form = useZodForm({
    schema: loginSchema,
  });

  const signUpLink = (
    <Link
      href="/auth/signup"
      variant="link"
      className="font-semibold text-green-600"
      preserveRedirect
    >
      Sign up.
    </Link>
  );

  const onSubmit = async ({
    email,
    password,
  }: Zod.infer<typeof loginSchema>) => {
    login({
      variables: { input: { email, password } },
      onError: () => handleError(),
      onCompleted: (data) => {
        if (data.login.errors) {
          setLoginError(data.login.errors![0] as Error);
        } else {
          init(data.login.authPayload!.session!.id).then(authRedirect);
        }
      },
    });
  };

  return (
    <Layout title="Login" authenticated={false}>
      <AuthCard
        title="Welcome back!"
        subtitle="Use the form below to login"
        action={{
          description: 'Dont have an account?',
          link: signUpLink,
        }}
      >
        <Form form={form} onSubmit={onSubmit} className="flex w-full flex-col">
          <AuthError title="Login failed." error={loginError} />
          <Form.Input
            label="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            autoFocus
            {...form.register('email')}
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            {...form.register('password')}
          />
          <div className="space-y-1">
            <p className="font-semibold">Forgot your password?</p>
            <Form.SubmitButton disabled={isInFlight || isRedirecting} fullWidth>
              Login
            </Form.SubmitButton>
          </div>
        </Form>
      </AuthCard>
    </Layout>
  );
};

export default LoginForm;
