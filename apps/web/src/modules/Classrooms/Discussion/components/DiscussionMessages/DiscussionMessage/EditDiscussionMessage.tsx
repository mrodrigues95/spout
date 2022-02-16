import { useCallback } from 'react';
import { graphql, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { useController } from 'react-hook-form';
import { Form, useZodForm, Button } from '@spout/toolkit';
import { useDiscussionMessage } from './DiscussionMessageProvider';
import { EditDiscussionMessageMutation } from './__generated__/EditDiscussionMessageMutation.graphql';
import { useKeyboardEvent } from '../../../../../../shared/hooks';

const messageSchema = object({
  message: string()
    .min(1, { message: 'Message cannot be empty' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
}).refine((data) => !!data.message.trim(), {
  message: 'Message cannot be empty',
  path: ['message'],
});

const mutation = graphql`
  mutation EditDiscussionMessageMutation(
    $input: UpdateDiscussionMessageInput!
  ) {
    updateDiscussionMessage(input: $input) {
      message {
        id
        content
      }
    }
  }
`;

const EditDiscussionMessage = () => {
  const { message, setIsEditing } = useDiscussionMessage()!;
  const [updateMessage] = useMutation<EditDiscussionMessageMutation>(mutation);

  const form = useZodForm({
    schema: messageSchema,
    defaultValues: { message: message.content },
  });

  const { field } = useController({
    name: 'message',
    control: form.control,
  });

  const onSubmit = useCallback(
    (data: Zod.infer<typeof messageSchema>) => {
      updateMessage({
        variables: { input: { messageId: message.id, content: data.message } },
        optimisticResponse: {
          updateDiscussionMessage: {
            message: { id: message.id, content: data.message },
          },
        },
      });
      setIsEditing(false);
    },
    [message.id, updateMessage, setIsEditing]
  );

  useKeyboardEvent('Escape', () => setIsEditing(false));

  return (
    <div className="bg-white w-[45rem] p-4 rounded-md">
      <Form form={form} onSubmit={onSubmit}>
        <Form.TextArea
          label="Edit Message"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }
          }}
          maxRows={5}
          autoFocus
          className="resize-none"
          isHiddenLabel
          onFocus={(e) => {
            // Place the cursor at the end of the message.
            e.currentTarget.setSelectionRange(
              field.value.length,
              field.value.length
            );
          }}
          {...field}
        />
        <div className="flex items-center justify-end space-x-2">
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Form.SubmitButton size="sm">Save</Form.SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default EditDiscussionMessage;
