import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import Zod, { object, string } from 'zod';
import { Button as SButton, Form, Modal, useZodForm } from '@spout/toolkit';
import { useToast } from '../../../../shared/components';
import { Item } from './Topic';
import { DescriptionMutation } from './__generated__/DescriptionMutation.graphql';
import { Description_discussion$key } from './__generated__/Description_discussion.graphql';
import { Description_user$key } from './__generated__/Description_user.graphql';

const descriptionFragment = graphql`
  fragment Description_discussion on Discussion {
    id
    description
  }
`;

const meFragment = graphql`
  fragment Description_user on User
  @argumentDefinitions(classroomId: { type: "ID!" }) {
    isClassroomTeacher(classroomId: $classroomId)
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
    .max(250, { message: '- Maximum 250 characters' })
    .nullable(),
});

interface Props {
  me: Description_user$key;
  discussion: Description_discussion$key;
}

const Description = ({ ...props }: Props) => {
  const discussion = useFragment(descriptionFragment, props.discussion);
  const me = useFragment(meFragment, props.me);
  const [updateDescription, isInFlight] =
    useMutation<DescriptionMutation>(mutation);

  const [isOpen, setIsOpen] = useState(false);
  const { handleError } = useToast();

  const form = useZodForm({
    schema: descriptionSchema,
    defaultValues: { description: discussion.description },
  });

  const onSubmit = useCallback(
    ({ description }: Zod.infer<typeof descriptionSchema>) =>
      updateDescription({
        variables: {
          input: {
            discussionId: discussion.id,
            description,
          },
        },
        onError: () => handleError(),
        onCompleted: () => {
          setIsOpen(false);
        },
      }),
    [updateDescription, discussion.id, handleError],
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Edit Description"
            description="Let people know what this discussion is for."
          />
          <Form form={form} onSubmit={onSubmit}>
            <Modal.Body>
              <Form.TextArea
                label="Description"
                maxRows={10}
                className="resize-none"
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
                loading={isInFlight}
              >
                Save Changes
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
      <Item
        label="Description"
        content={discussion.description}
        onClick={() => setIsOpen(true)}
        isClassroomTeacher={me.isClassroomTeacher}
      />
    </>
  );
};

export default Description;
