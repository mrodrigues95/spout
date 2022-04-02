import { useCallback, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import { useRouter } from 'next/router';
import Zod, { object, string } from 'zod';
import { Form, Title, useZodForm, Link } from '@spout/toolkit';
import { Layout, useToast } from '../../../shared/components';
import AuthContainer from './AuthContainer';
import { ResetPasswordMutation } from './__generated__/ResetPasswordMutation.graphql';

const resetPasswordSchema = object({
  password: string().min(6, { message: '- Invalid password' }),
  confirmPassword: string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: '- Passwords do not match',
  path: ['confirmPassword'],
});

const mutation = graphql`
  mutation ResetPasswordMutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      errors {
        ... on InvalidTokenError {
          message
        }
      }
    }
  }
`;

const ResetPassword = () => {
  const router = useRouter();
  const [status, setStatus] = useState({ reset: false, expired: false });
  const { handleError } = useToast();
  const [resetPassword, isInFlight] =
    useMutation<ResetPasswordMutation>(mutation);

  const form = useZodForm({
    schema: resetPasswordSchema,
  });

  const onSubmit = useCallback(
    ({ password, confirmPassword }: Zod.infer<typeof resetPasswordSchema>) => {
      const token = router.query.token as string;

      resetPassword({
        variables: {
          input: {
            token,
            newPassword: password,
            confirmNewPassword: confirmPassword,
          },
        },
        onError: () => handleError(),
        onCompleted: ({ resetPassword: { errors } }) => {
          if (errors) {
            setStatus({ reset: false, expired: true });
          } else {
            setStatus({ reset: true, expired: false });
          }
        },
      });
    },
    [handleError, resetPassword, router],
  );

  return (
    <Layout title="Reset Password" authenticated={false}>
      <AuthContainer
        title={
          !status.expired && !status.reset
            ? 'Create a new password'
            : status.reset
            ? 'Success!'
            : 'Password reset token has expired'
        }
      >
        {!status.expired && !status.reset && (
          <Form form={form} onSubmit={onSubmit} className="w-full">
            <Form.Input
              label="Password"
              placeholder="Password"
              autoComplete="new-password"
              type="password"
              {...form.register('password')}
              required
            />
            <Form.Input
              label="Confirm password"
              placeholder="Confirm password"
              autoComplete="new-password"
              type="password"
              {...form.register('confirmPassword')}
              required
            />
            <Form.SubmitButton className="!mt-6" loading={isInFlight}>
              Reset your password
            </Form.SubmitButton>
          </Form>
        )}
        {status.reset && (
          <>
            <Title
              as="h2"
              variant="h5"
              className="mb-8 -mt-6 text-center font-normal"
            >
              Your password has successfully been reset.
            </Title>
            <Link href="/auth/login" variant="primary" fullWidth replace>
              Log in
            </Link>
          </>
        )}
        {status.expired && (
          <>
            <Title
              as="h2"
              variant="h5"
              className="mb-8 -mt-6 text-center font-normal"
            >
              Please request another password reset.
            </Title>
            <Link href="/auth/forgot" variant="primary" fullWidth replace>
              Forgot password
            </Link>
          </>
        )}
      </AuthContainer>
    </Layout>
  );
};

export default ResetPassword;
