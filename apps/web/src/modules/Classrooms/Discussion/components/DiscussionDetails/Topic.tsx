import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Zod, { object, string } from 'zod';
import {
  Button as SButton,
  Form,
  Modal,
  useZodForm,
  Text,
  generateId,
  Tooltip,
} from '@spout/toolkit';
import { useToast } from '../../../../../shared/components';
import { TopicMutation } from './__generated__/TopicMutation.graphql';
import { Topic_discussion$key } from './__generated__/Topic_discussion.graphql';

interface ItemProps {
  label: 'Topic' | 'Description';
  content?: string | null;
  onClick: () => void;
}

export const Item = ({ label, content, onClick }: ItemProps) => {
  const Component = content ? SButton : 'div';

  const item = (
    <Component
      className="relative w-full flex items-center justify-between space-x-4"
      {...(content && {
        variant: 'unstyled',
        'aria-labelledby': `spout-details-label-${generateId()}`,
        'aria-describedby': `spout-details-desc-${generateId()}`,
        onClick,
      })}
    >
      <div className="inline-flex items-center space-x-2">
        <FontAwesomeIcon
          icon={label === 'Topic' ? faCommentAlt : faPencilAlt}
          className="text-gray-500"
        />
        <Text color="muted" size="xs" weight="medium" casing="uppercase">
          {label}
        </Text>
      </div>
      {content ? (
        <Text className="text-gray-900" weight="medium" truncate>
          {content}
        </Text>
      ) : (
        <SButton
          size="xs"
          variant="light"
          scheme="orange"
          className="uppercase rounded"
          onClick={onClick}
        >
          Edit
        </SButton>
      )}
    </Component>
  );

  return (
    <>
      {content ? (
        <Tooltip
          label={content}
          placement="left-start"
          className="block max-w-[40rem] max-h-[40rem] p-2 rounded-md shadow-md bg-white ring-1 ring-gray-900/5 break-words whitespace-pre-line"
          unstyled
        >
          {item}
        </Tooltip>
      ) : (
        item
      )}
    </>
  );
};

const fragment = graphql`
  fragment Topic_discussion on Discussion {
    id
    topic
  }
`;

const mutation = graphql`
  mutation TopicMutation($input: UpdateDiscussionTopicInput!) {
    updateDiscussionTopic(input: $input) {
      discussion {
        id
        topic
      }
    }
  }
`;

const topicSchema = object({
  topic: string()
    .min(1, { message: '- Minimum 1 character' })
    .max(250, { message: '- Maximum 250 characters' }),
});

interface Props {
  discussion: Topic_discussion$key;
}

const Topic = ({ discussion }: Props) => {
  const data = useFragment(fragment, discussion);
  const [updateTopic, isInFlight] = useMutation<TopicMutation>(mutation);

  const [isOpen, setIsOpen] = useState(false);
  const { handleError } = useToast();

  const form = useZodForm({
    schema: topicSchema,
  });

  const onSubmit = useCallback(
    ({ topic }: Zod.infer<typeof topicSchema>) =>
      updateTopic({
        variables: {
          input: {
            discussionId: data.id,
            topic,
          },
        },
        onError: () => handleError(),
        onCompleted: () => {
          form.reset();
          setIsOpen(false);
        },
      }),
    [updateTopic, data.id, form, handleError]
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form form={form} onSubmit={onSubmit}>
          <Modal.Content>
            <Modal.Header
              title="Edit Topic"
              description="Let people know what this discussion is focused on right now."
            />
            <Modal.Body>
              <Form.TextArea
                label="Topic"
                maxRows={10}
                {...form.register('topic')}
              />
            </Modal.Body>
            <Modal.Footer>
              <SButton
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </SButton>
              <Form.SubmitButton
                size="sm"
                disabled={isInFlight}
                isSubmitting={isInFlight}
              >
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <Item
        label="Topic"
        content={data.topic}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};

export default Topic;
