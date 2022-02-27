import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, useZodForm, Link } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import { useAuthRedirect, useInitializeIronSession } from '../hooks';
import AuthError from './AuthError';
import AuthCard from './AuthCard';
import { SignUpFormMutation } from '../../../__generated__/SignUpFormMutation.graphql';

const signUpSchema = object({
  name: string()
    .min(1, { message: '- Invalid name' })
    .max(70, { message: '- Name is too long' }),
  email: string().email({ message: '- Invalid email' }),
  password: string()
    .min(1, { message: '- Invalid password' })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
      message: '- That password is too easy to guess',
    }),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '- Passwords do not match',
  path: ['confirmPassword'],
});

const mutation = graphql`
  mutation SignUpFormMutation($input: SignUpInput!) {
    signUp(input: $input) {
      authPayload {
        session {
          id
        }
      }
      errors {
        ... on SignUpNewUserError {
          message
        }
      }
    }
  }
`;

const SignUpForm = () => {
  const authRedirect = useAuthRedirect();
  const isRedirecting = useIsRedirecting();
  const init = useInitializeIronSession();
  const { handleError } = useToast();
  const [signUpError, setSignUpError] = useState<Error>();
  const [signUp, isInFlight] = useMutation<SignUpFormMutation>(mutation);

  const form = useZodForm({
    schema: signUpSchema,
  });

  const loginLink = (
    <Link href="/auth/login" variant="link" preserveRedirect>
      Login.
    </Link>
  );

  const onSubmit = async ({
    name,
    email,
    password,
  }: Zod.infer<typeof signUpSchema>) => {
    signUp({
      variables: { input: { name, email, password } },
      onError: () => handleError(),
      onCompleted: (data) => {
        if (data.signUp.errors) {
          setSignUpError(data.signUp.errors![0] as Error);
        } else {
          init(data.signUp.authPayload!.session!.id).then(authRedirect);
        }
      },
    });
  };

  return (
    <Layout title="Sign Up" authenticated={false}>
      <AuthCard
        title="Create an account"
        action={{
          description: 'Already have an account?',
          link: loginLink,
        }}
      >
        <Form form={form} onSubmit={onSubmit} className="flex w-full flex-col">
          <AuthError title="Sign Up failed." error={signUpError} />
          <Form.Input
            label="Name"
            autoComplete="name"
            placeholder="Name"
            {...form.register('name')}
          />
          <Form.Input
            label="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...form.register('email')}
          />
          <Form.Input
            label="Password"
            placeholder="Password"
            autoComplete="new-password"
            type="password"
            {...form.register('password')}
          />
          <Form.Input
            label="Confirm password"
            placeholder="Confirm password"
            autoComplete="new-password"
            type="password"
            {...form.register('confirmPassword')}
          />
          <Form.SubmitButton disabled={isInFlight || isRedirecting}>
            Sign Up
          </Form.SubmitButton>
        </Form>
      </AuthCard>
    </Layout>
  );
};

export default SignUpForm;
