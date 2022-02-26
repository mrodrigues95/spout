import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Button as SButton, Form, Modal, useZodForm } from '@spout/toolkit';
import { useToast } from '../../../../../shared/components';
import { DescriptionMutation } from '../../../../../__generated__/DescriptionMutation.graphql';
import { Description_discussion$key } from '../../../../../__generated__/Description_discussion.graphql';
import { Item } from './Topic';

const fragment = graphql`
  fragment Description_discussion on Discussion {
    id
    description
  }
`;

const mutation = graphql`
  mutation DescriptionMutation($input: UpdateDiscussionDescriptionInput!) {
    updateDiscussionDescription(input: $input) {
      discussion {
        id
        description
      }
    }
  }
`;

const descriptionSchema = object({
  description: string()
    .min(1, { message: '- Minimum 1 character' })
    .max(250, { message: '- Maximum 250 characters' }),
});

interface Props {
  discussion: Description_discussion$key;
}

const Description = ({ discussion }: Props) => {
  const data = useFragment(fragment, discussion);
  const [updateDescription, isInFlight] =
    useMutation<DescriptionMutation>(mutation);

  const [isOpen, setIsOpen] = useState(false);
  const { handleError } = useToast();

  const form = useZodForm({
    schema: descriptionSchema,
  });

  const onSubmit = useCallback(
    ({ description }: Zod.infer<typeof descriptionSchema>) =>
      updateDescription({
        variables: {
          input: {
            discussionId: data.id,
            description,
          },
        },
        onError: () => handleError(),
        onCompleted: () => {
          form.reset();
          setIsOpen(false);
        },
      }),
    [updateDescription, data.id, form, handleError],
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content>
            <Modal.Header
              title="Edit Description"
              description="Let people know what this discussion is for."
            />
            <Modal.Body>
              <Form.TextArea
                label="Description"
                maxRows={10}
                {...form.register('description')}
              />
            </Modal.Body>
            <Modal.Footer>
              <SButton size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </SButton>
              <Form.SubmitButton
                size="sm"
                variant="primary"
                disabled={isInFlight}
                isSubmitting={isInFlight}
              >
                Save Changes
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <Item
        label="Description"
        content={data.description}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};

export default Description;
