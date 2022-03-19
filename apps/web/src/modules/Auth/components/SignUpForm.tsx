import { useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, useZodForm, Link, Text } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import { useIsRedirecting } from '../../../shared/hooks/useIsRedirecting';
import { useAuthRedirect, useInitializeIronSession } from '../hooks';
import AuthError from './AuthError';
import AuthContainer from './AuthContainer';
import { SignUpFormMutation } from '../../../__generated__/SignUpFormMutation.graphql';

const signUpSchema = object({
  name: string()
    .min(1, { message: '- Invalid name' })
    .max(70, { message: '- Name cannot exceed 70 characters' }),
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
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
      <AuthContainer title="Sign up">
        <Form form={form} onSubmit={onSubmit} className="w-full">
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
          <Form.SubmitButton
            className="!mt-6"
            loading={isInFlight}
            disabled={isRedirecting}
          >
            Sign up
          </Form.SubmitButton>
        </Form>
        <div className="mt-12 space-x-1.5 text-center">
          <Text as="span" color="dark" size="sm">
            Already have an account?
          </Text>
          <Link
            href="/auth/login"
            variant="link"
            className="text-sm"
            preserveRedirect
          >
            Log in
          </Link>
        </div>
      </AuthContainer>
    </Layout>
  );
};

export default SignUpForm;
