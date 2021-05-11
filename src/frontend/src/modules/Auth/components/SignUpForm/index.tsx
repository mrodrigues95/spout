import { gql, useMutation } from '@apollo/client';
import { object, string } from 'zod';
import {
  Button,
  Link,
  Input,
  Form,
  useZodForm,
  PrimaryLayout,
} from '~/shared/components';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import AuthError from '../AuthError';
import AuthCard from '../AuthCard';
import {
  SignUpMutation,
  SignUpMutationVariables,
} from './__generated__/index.generated';

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
  const [signup, signupResult] = useMutation<
    SignUpMutation,
    SignUpMutationVariables
  >(SIGN_UP_MUTATION, {
    async onCompleted({ signUp }) {
      if (!signUp.userErrors) {
        await fetch('/api/sessions/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signUp.session?.id),
        });
        authRedirect();
      }
    },
    onError: (error) => console.log(error.message),
  });

  const form = useZodForm({
    schema: signUpSchema,
  });

  const loginLink = (
    <Link
      href="/auth/login"
      className="text-green-600 font-semibold focus:outline-none focus:underline hover:underline"
      preserveRedirect
    >
      Login.
    </Link>
  );

  return (
    <PrimaryLayout title="Sign Up">
      <AuthCard
        title="Create an account"
        action={{
          description: 'Already have an account?',
          link: loginLink,
        }}
      >
        <Form
          form={form}
          onSubmit={({ name, email, password }) => {
            signup({
              variables: { input: { name, email, password } },
            });
          }}
          className="flex flex-col w-full"
        >
          <AuthError
            title="Sign Up failed."
            error={
              signupResult.error ||
              signupResult.data?.signUp.userErrors?.shift()
            }
          />
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
          <Button type="submit">Sign Up</Button>
        </Form>
      </AuthCard>
    </PrimaryLayout>
  );
};

export default SignUpForm;
