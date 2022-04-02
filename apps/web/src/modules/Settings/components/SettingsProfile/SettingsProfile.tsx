import { Suspense, useCallback } from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { useWatch } from 'react-hook-form';
import Zod, { object, string } from 'zod';
import {
  Button,
  Title,
  Form,
  useZodForm,
  useCharacterCountRemaining,
  Spinner,
} from '@spout/toolkit';
import {
  ErrorBoundary,
  ErrorFallback,
  useToast,
} from '../../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { SettingsProfileQuery } from '../../../../__generated__/SettingsProfileQuery.graphql';
import { SettingsProfileMutation } from '../../../../__generated__/SettingsProfileMutation.graphql';
import SettingsProfilePhoto from './SettingsProfilePhoto';

const BIO_CHARACTER_LIMIT = 190;

const profileSchema = object({
  name: string()
    .min(1, { message: '- Invalid name' })
    .max(70, { message: '- Name cannot exceed 70 characters' }),
  bio: string().max(BIO_CHARACTER_LIMIT, { message: ' ' }),
});

const query = graphql`
  query SettingsProfileQuery {
    me {
      name
      bio
      avatarUrl
      profileColor
      ...SettingsProfilePhoto_user
    }
  }
`;

const mutation = graphql`
  mutation SettingsProfileMutation($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      user {
        name
        bio
      }
    }
  }
`;

interface Props {
  fetchKey: number;
}

const SettingsProfile = ({ fetchKey }: Props) => {
  const data = useLazyLoadQuery<SettingsProfileQuery>(query, {}, { fetchKey });
  const [updateProfile, isInFlight] =
    useMutation<SettingsProfileMutation>(mutation);
  const { handleError } = useToast();
  const isTablet = useMediaQuery(MEDIA_QUERIES.LARGE);

  const form = useZodForm({
    schema: profileSchema,
    defaultValues: {
      name: data.me!.name,
      bio: data.me!.bio ?? undefined,
    },
  });

  const bio = useWatch({ name: 'bio', control: form.control });
  const { isOverLimit, remaining } = useCharacterCountRemaining({
    value: bio,
    limit: 190,
  });

  const onSubmit = useCallback(
    (input: Zod.infer<typeof profileSchema>) =>
      updateProfile({
        variables: { input },
        onError: () => handleError(),
        onCompleted: ({ updateProfile: { user } }) => {
          form.reset({ name: user!.name, bio: user!.bio ?? undefined });
        },
      }),
    [updateProfile, handleError, form],
  );

  return (
    <Form
      form={form}
      className="flex flex-col space-y-5 divide-y divide-gray-200"
      onSubmit={onSubmit}
    >
      <div className="flex items-center space-x-2">
        <Title
          as="h2"
          variant={isTablet ? 'h4' : 'h5'}
          className="flex-1 font-medium"
        >
          Update your profile details here
        </Title>
        <Button
          variant="secondary"
          size={isTablet ? 'md' : 'sm'}
          onClick={() => form.reset()}
          disabled={isInFlight || !form.formState.isDirty}
        >
          Reset
        </Button>
        <Form.SubmitButton
          variant="primary"
          size={isTablet ? 'md' : 'sm'}
          className="ml-2"
          disabled={!form.formState.isDirty}
          loading={isInFlight}
        >
          Save
        </Form.SubmitButton>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:space-x-8">
        <div className="mt-5 flex-1">
          <Form.Input
            label="Name"
            placeholder="Name"
            autoComplete="off"
            labelProps={{ className: 'max-w-xs' }}
            className="!mb-5"
            {...form.register('name')}
          />
          <Form.TextArea
            className="resize-none"
            label="About Me"
            minRows={5}
            maxRows={10}
            helperText={
              isOverLimit ? `${remaining}` : `${remaining} characters left`
            }
            helperTextProps={{
              className: isOverLimit ? 'text-red-600' : 'text-gray-500',
            }}
            {...form.register('bio')}
          />
        </div>
        <SettingsProfilePhoto me={data.me!} />
      </div>
    </Form>
  );
};

const SettingsProfileWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="There was a problem loading your profile details."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <SettingsProfile fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default SettingsProfileWithSuspense;
