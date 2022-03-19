import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, useZodForm, Link, Text } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import { useAuthRedirect, useInitializeIronSession } from '../hooks';
import AuthContainer from './AuthContainer';
import AuthError from './AuthError';
import { LoginFormMutation } from '../../../__generated__/LoginFormMutation.graphql';

const loginSchema = object({
  email: string().email({ message: '- Invalid email or password' }),
  password: string().min(6, { message: '- Invalid email or password' }),
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
    <Layout title="Log In" authenticated={false}>
      <AuthContainer title="Log in">
        <Form form={form} onSubmit={onSubmit} className="w-full">
          <AuthError title="Log in failed." error={loginError} />
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

          <Form.SubmitButton
            className="!mt-6"
            loading={isInFlight}
            disabled={isRedirecting}
            fullWidth
          >
            Log in
          </Form.SubmitButton>
        </Form>
        <div className="mt-12 w-full space-y-4 text-center">
          <Link
            href="/auth/forgot"
            variant="link"
            className="text-sm"
            preserveRedirect
          >
            Forgot password?
          </Link>
          <div className="w-full border-t-2 border-gray-100"></div>
          <div className="mt-auto space-x-1.5">
            <Text as="span" color="dark" size="sm">
              Don&apos;t have an account?
            </Text>
            <Link
              href="/auth/signup"
              variant="link"
              className="text-sm"
              preserveRedirect
            >
              Sign up
            </Link>
          </div>
        </div>
      </AuthContainer>
    </Layout>
  );
};

export default LoginForm;
