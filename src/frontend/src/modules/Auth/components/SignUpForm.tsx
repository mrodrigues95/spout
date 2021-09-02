import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Zod, { object, string } from 'zod';
import {
  Link,
  Input,
  Form,
  useZodForm,
  Layout,
  useToast,
} from '~/shared/components';
import { useAuthRedirect, useInitializeSessionMutation } from '../hooks';
import AuthError from './AuthError';
import AuthCard from './AuthCard';
import { UserError } from '~/__generated__/schema.generated';
import {
  SignUpMutation,
  SignUpMutationVariables,
} from './__generated__/SignUpForm.generated';

const SIGN_UP_MUTATION = gql`
  mutation SignUpMutation($input: SignUpInput!) {
    signUp(input: $input) {
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

const SignUpForm = () => {
  const authRedirect = useAuthRedirect();
  const init = useInitializeSessionMutation();
  const { handleError } = useToast();
  const [signUpError, setSignUpError] = useState<Error | UserError>();
  const [signup] = useMutation<SignUpMutation, SignUpMutationVariables>(
    SIGN_UP_MUTATION
  );

  const form = useZodForm({
    schema: signUpSchema,
  });

  const loginLink = (
    <Link
      href="/auth/login"
      variant="unstyled"
      className="text-green-600 font-semibold focus:outline-none focus:underline hover:underline"
      preserveRedirect
    >
      Login.
    </Link>
  );

  const onSubmit = async ({
    name,
    email,
    password,
  }: Zod.infer<typeof signUpSchema>) => {
    try {
      const result = await signup({
        variables: { input: { name, email, password } },
      });

      if (result.data?.signUp?.userErrors) {
        setSignUpError(result.data?.signUp?.userErrors?.shift());
        return;
      }

      await init(result.data?.signUp?.session?.id!);
      authRedirect();
    } catch (error) {
      handleError(error);
      console.error(error.message);
    }
  };

  return (
    <Layout title="Sign Up" unauthenticated>
      <AuthCard
        title="Create an account"
        action={{
          description: 'Already have an account?',
          link: loginLink,
        }}
      >
        <Form form={form} onSubmit={onSubmit} className="flex flex-col w-full">
          <AuthError title="Sign Up failed." error={signUpError} />
          <Input
            label="Name"
            autoComplete="name"
            placeholder="Name"
            {...form.register('name')}
          />
          <Input
            label="Email"
            placeholder="Email"
            type="email"
            autoComplete="email"
            {...form.register('email')}
          />
          <Input
            label="Password"
            placeholder="Password"
            type="password"
            autoComplete="password"
            {...form.register('password')}
          />
          <Input
            label="Confirm password"
            placeholder="Confirm password"
            autoComplete="password"
            type="password"
            {...form.register('confirmPassword')}
          />
          <Form.SubmitButton>Sign Up</Form.SubmitButton>
        </Form>
      </AuthCard>
    </Layout>
  );
};

export default SignUpForm;
