import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Form, Title, useZodForm, Text, Link } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import AuthContainer from './AuthContainer';
import { ForgotPasswordMutation } from '../../../__generated__/ForgotPasswordMutation.graphql';

const forgotPasswordSchema = object({
  email: string().email({ message: '- Invalid email' }),
});

const mutation = graphql`
  mutation ForgotPasswordMutation($input: GeneratePasswordResetTokenInput!) {
    generatePasswordResetToken(input: $input) {
      authPayload {
        isLoggedIn
      }
    }
  }
`;

const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const { handleError } = useToast();
  const [sendPasswordResetEmail, isInFlight] =
    useMutation<ForgotPasswordMutation>(mutation);

  const form = useZodForm({
    schema: forgotPasswordSchema,
  });

  const onSubmit = useCallback(
    ({ email }: Zod.infer<typeof forgotPasswordSchema>) =>
      sendPasswordResetEmail({
        variables: { input: { email } },
        onError: handleError,
        onCompleted: () => setEmailSent(true),
      }),
    [handleError, sendPasswordResetEmail],
  );

  return (
    <Layout title="Forgot Password" authenticated={false}>
      <AuthContainer
        title={emailSent ? 'Check your email' : 'Forgot password?'}
      >
        <Title
          as="h2"
          variant="h5"
          className="mb-8 -mt-6 text-center font-normal"
        >
          {emailSent
            ? 'We have sent password recovery instructions to your email.'
            : "Enter your email and we'll send you a link to reset your password."}
        </Title>
        {!emailSent && (
          <Form form={form} onSubmit={onSubmit} className="w-full">
            <Form.Input
              label="Email"
              placeholder="Email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              {...form.register('email')}
            />
            <Form.SubmitButton className="!mt-6" loading={isInFlight}>
              Reset your password
            </Form.SubmitButton>
          </Form>
        )}
        {!emailSent && (
          <div className="mt-12 space-x-1.5 text-center">
            <Text as="span" color="dark" size="sm">
              Remembered your password?
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
        )}
      </AuthContainer>
    </Layout>
  );
};

export default ForgotPassword;
