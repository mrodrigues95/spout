import { object, string } from 'zod';
import {
  Button,
  Link,
  Input,
  Form,
  useZodForm,
  PrimaryLayout,
} from '~/shared/components';
import AuthCard from '../AuthCard';

const signUpSchema = object({
  name: string()
    .min(1, { message: '- Name is required' })
    .max(70, { message: '- Name is too long' }),
  email: string().email({ message: '- Invalid email' }),
  password: string()
    .min(1, { message: '- Password is required' })
    .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/, {
      message: '- That password is too easy to guess',
    }),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '- Passwords do not match',
  path: ['confirmPassword'],
});

const SignUpForm = () => {
  const form = useZodForm({
    schema: signUpSchema,
  });

  const loginLink = (
    <Link
      href="/auth/login"
      className="text-green-600 font-semibold focus:outline-none focus:underline hover:underline"
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
          onSubmit={() => console.log('Submitted!')}
          className="flex flex-col w-full"
        >
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
