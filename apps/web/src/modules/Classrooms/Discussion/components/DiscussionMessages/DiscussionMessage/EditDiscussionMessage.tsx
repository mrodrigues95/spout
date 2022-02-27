import { useCallback } from 'react';
import Zod, { object, string } from 'zod';
import { useController } from 'react-hook-form';
import { Form, useZodForm, Button } from '@spout/toolkit';
import { useDiscussionMessage } from './DiscussionMessageProvider';
import { useKeyboardEvent } from '../../../../../../shared/hooks';

const messageSchema = object({
  message: string()
    .min(1, { message: 'Message cannot be empty' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
}).refine((data) => !!data.message.trim(), {
  message: 'Message cannot be empty',
  path: ['message'],
});

const EditDiscussionMessage = () => {
  const {
    data: { message },
    actions: { edit },
    state: { setIsEditing },
  } = useDiscussionMessage()!;

  const form = useZodForm({
    schema: messageSchema,
    defaultValues: { message: message.content.trim() },
  });

  const { field } = useController({
    name: 'message',
    control: form.control,
  });

  const onSubmit = useCallback(
    ({ message: updatedMessage }: Zod.infer<typeof messageSchema>) => {
      edit(updatedMessage);
      setIsEditing(false);
    },
    [edit, setIsEditing],
  );

  useKeyboardEvent('Escape', () => setIsEditing(false));

  return (
    <div className="rounded-md bg-white p-4 sm:w-[30rem] md:w-[35rem] xl:w-[50rem]">
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
              field.value.length,
            );
          }}
          {...field}
        />
        <div className="flex items-center justify-end space-x-2">
          <Button size="sm" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
          <Form.SubmitButton size="sm">Save</Form.SubmitButton>
        </div>
      </Form>
    </div>
  );
};

export default EditDiscussionMessage;
