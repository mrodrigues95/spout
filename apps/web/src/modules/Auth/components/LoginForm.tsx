import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, useZodForm, Link, Text } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import {
  useAuthRedirect,
  useInitializeIronSession,
  useSendTwoFactorCodeMutation,
} from '../hooks';
import AuthContainer from './AuthContainer';
import AuthError from './AuthError';
import LoginTwoFactor from './LoginTwoFactor';
import { LoginFormMutation } from '../../../__generated__/LoginFormMutation.graphql';

const mutation = graphql`
  mutation LoginFormMutation($input: LoginInput!) {
    login(input: $input) {
      authPayload {
        isLoggedIn
        requiresTwoFactorLogin
        user {
          preferredProvider
          email
          phoneNumber
        }
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
  email: string().email({ message: '- Invalid email or password' }),
  password: string().min(6, { message: '- Invalid email or password' }),
});

const LoginForm = () => {
  const authRedirect = useAuthRedirect();
  const isRedirecting = useIsRedirecting();
  const initSession = useInitializeIronSession();
  const [loginError, setLoginError] = useState<Error>();
  const [twoFactor, setTwoFactor] = useState<{
    required: boolean;
    email: string | null;
    phoneNumber: string | null;
  }>({
    required: false,
    email: null,
    phoneNumber: null,
  });
  const { handleError } = useToast();

  const [sendCode, isSendingCode] = useSendTwoFactorCodeMutation();
  const [login, isLoggingIn] = useMutation<LoginFormMutation>(mutation);

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
      onCompleted: ({ login: { errors, authPayload } }) => {
        if (errors) {
          setLoginError(errors[0] as Error);
          return;
        }

        if (authPayload!.requiresTwoFactorLogin) {
          sendCode({
            onError: () => handleError(),
            onCompleted: (errors) => {
              if (errors) {
                handleError();
              } else {
                const isEmailPreferred = authPayload!.user!.preferredProvider;
                const email = authPayload!.user!.email;
                const phone = authPayload!.user!.phoneNumber;

                setTwoFactor({
                  required: true,
                  email: isEmailPreferred ? email : null,
                  phoneNumber: isEmailPreferred ? null : phone,
                });
              }
            },
          });
        } else {
          initSession(authPayload!.session!.id).then(authRedirect);
        }
      },
    });
  };

  // This is only used for two-factor logins when the user idles for too
  // long and their two-factor Identity cookie expires meaning they must
  // sign in again.
  const resetLoginForm = useCallback(() => {
    form.reset();
    setLoginError(undefined);
    setTwoFactor({ required: false, email: null, phoneNumber: null });
    handleError(
      new Error('Something went wrong. Please try logging in again.'),
    );
  }, [form, handleError]);

  return (
    <Layout title="Log In" authenticated={false}>
      {twoFactor.required ? (
        <LoginTwoFactor
          email={twoFactor.email}
          phoneNumber={twoFactor.phoneNumber}
          resetLoginForm={resetLoginForm}
        />
      ) : (
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
              loading={isLoggingIn || isSendingCode}
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
      )}
    </Layout>
  );
};

export default LoginForm;
