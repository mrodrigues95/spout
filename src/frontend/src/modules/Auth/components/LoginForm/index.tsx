import { useState } from 'react';
import Zod, { object, string } from 'zod';
import { gql, useMutation } from '@apollo/client';
import {
  FormSubmitButton,
  Link,
  Input,
  Form,
  useZodForm,
  PrimaryLayout,
  useToast,
} from '~/shared/components';
import { useAuthRedirect, useInitializeSessionMutation } from '~/modules';
import AuthCard from '../AuthCard';
import AuthError from '../AuthError';
import { UserError } from '~/__generated__/schema.generated';
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
  const init = useInitializeSessionMutation();
  const [loginError, setLoginError] = useState<Error | UserError>();
  const { handleError } = useToast();
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(
    LOGIN_MUTATION
  );

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

  const onSubmit = async ({
    email,
    password,
  }: Zod.infer<typeof loginSchema>) => {
    try {
      const result = await login({
        variables: { input: { email, password } },
      });

      if (result.data?.login?.userErrors) {
        setLoginError(result.data?.login?.userErrors?.shift());
        return;
      }

      await init(result.data?.login?.session?.id!);
      authRedirect();
    } catch (error) {
      handleError(error);
      console.error(error.message);
    }
  };

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
        <Form form={form} onSubmit={onSubmit} className="flex flex-col w-full">
          <AuthError title="Login failed." error={loginError} />
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
          <FormSubmitButton>Login</FormSubmitButton>
        </Form>
      </AuthCard>
    </PrimaryLayout>
  );
};

export default LoginForm;
