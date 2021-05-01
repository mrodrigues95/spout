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

const loginSchema = object({
  email: string().email({ message: '- Invalid email' }),
  password: string().min(6, { message: '- Invalid password' }),
});

const LoginForm = () => {
  const form = useZodForm({
    schema: loginSchema,
  });

  const signUpLink = (
    <Link
      href="/auth/signup"
      className="text-green-600 font-semibold focus:outline-none focus:underline hover:underline"
    >
      Sign up.
    </Link>
  );

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
        <Form
          form={form}
          onSubmit={() => console.log('Submitted!')}
          className="flex flex-col w-full"
        >
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
          <Button type="submit">Login</Button>
        </Form>
      </AuthCard>
    </PrimaryLayout>
  );
};

export default LoginForm;
