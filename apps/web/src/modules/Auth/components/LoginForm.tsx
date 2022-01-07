import { useState } from 'react';
import Zod, { object, string } from 'zod';
import { gql, useMutation } from '@apollo/client';
import { Form, useZodForm, Link } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import { useAuthRedirect, useInitializeSessionMutation } from '../hooks';
import AuthCard from './AuthCard';
import AuthError from './AuthError';
import {
  LoginMutation,
  LoginMutationVariables,
} from './__generated__/LoginForm.generated';

const mutation = gql`
  mutation LoginMutation($input: LoginInput!) {
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

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
});

const LoginForm = () => {
  const authRedirect = useAuthRedirect();
  const isRedirecting = useIsRedirecting();
  const init = useInitializeSessionMutation();
  const [loginError, setLoginError] = useState<unknown>();
  const { handleError } = useToast();
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(mutation);

  const form = useZodForm({
    schema: loginSchema,
  });

  const signUpLink = (
    <Link
      href="/auth/signup"
      variant="link"
      className="text-green-600 font-semibold"
      preserveRedirect
    >
      Sign up.
    </Link>
  );

  const onSubmit = async ({
    email,
    password,
  }: Zod.infer<typeof loginSchema>) => {
    try {
      const { data } = await login({
        variables: { input: { email, password } },
      });

      // TODO: Use generic errors here to prevent user enumeration.
      if (data?.login.errors) {
        setLoginError(data!.login.errors!.shift());
        return;
      }

      await init(data!.login.authPayload!.session!.id);
      authRedirect();
    } catch (error) {
      handleError();
    }
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
        <Form form={form} onSubmit={onSubmit} className="flex flex-col w-full">
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
            <Form.SubmitButton disabled={isRedirecting} fullWidth>
              Login
            </Form.SubmitButton>
          </div>
        </Form>
      </AuthCard>
    </Layout>
  );
};

export default LoginForm;
