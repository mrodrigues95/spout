import { useWatch } from 'react-hook-form';
import { object, string } from 'zod';
import {
  Button,
  Title,
  Form,
  useZodForm,
  useCharacterCountRemaining,
  Avatar,
  Dropzone,
} from '@spout/toolkit';

const BIO_CHARACTER_LIMIT = 190;

const profileSchema = object({
  name: string()
    .min(1, { message: '- Invalid name' })
    .max(70, { message: '- Name cannot exceed 70 characters' }),
  bio: string().max(BIO_CHARACTER_LIMIT, { message: ' ' }),
});

const Profile = () => {
  const form = useZodForm({
    schema: profileSchema,
  });

  const bio = useWatch({ name: 'bio', control: form.control });
  const { isOverLimit, currentCount } = useCharacterCountRemaining({
    value: bio,
    limit: 190,
  });

  return (
    <Form
      form={form}
      className="flex flex-col space-y-5 divide-y divide-gray-200"
      onSubmit={() => console.log('test')}
    >
      <div className="flex items-center">
        <Title as="h2" variant="h4" className="flex-1 font-medium">
          Update your profile details here
        </Title>
        <Button variant="secondary">Reset</Button>
        <Form.SubmitButton variant="primary" className="ml-2">
          Save
        </Form.SubmitButton>
      </div>
      <div className="flex flex-col-reverse md:flex-row md:space-x-8">
        <div className="mt-5 flex-1">
          <Form.Input
            label="Name"
            placeholder="Name"
            autoComplete="name"
            labelProps={{ className: 'max-w-xs' }}
            className="!mb-5"
            {...form.register('name')}
            autoFocus
          />
          <Form.TextArea
            className="resize-none"
            label="About Me"
            minRows={5}
            maxRows={10}
            helperText={
              isOverLimit
                ? `${currentCount}`
                : `${currentCount} characters left`
            }
            helperTextProps={{
              className: isOverLimit ? 'text-red-600' : 'text-gray-500',
            }}
            {...form.register('bio')}
          />
        </div>
        <div className="mt-5 space-y-6">
          <Title as="h2" variant="h5" className="font-medium">
            Your photo
          </Title>
          <div className="flex space-x-8">
            <Avatar name="John Doe" scheme="orange" size="xxl" rounded />
            <Dropzone primaryMessage="Select a photo to upload" />
          </div>
        </div>
      </div>
    </Form>
  );
};

export default Profile;
