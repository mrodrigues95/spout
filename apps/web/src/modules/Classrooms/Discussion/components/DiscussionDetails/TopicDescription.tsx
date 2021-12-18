import { useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Zod, { object, string } from 'zod';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Button as SButton,
  Form,
  generateId,
  Modal,
  Text,
  Tooltip,
  useZodForm,
} from '@spout/toolkit';
import { DiscussionQuery } from '../__generated__/Discussion.generated';
import {
  UpdateDiscussionDescriptionMutation,
  UpdateDiscussionDescriptionMutationVariables,
  UpdateDiscussionTopicMutation,
  UpdateDiscussionTopicMutationVariables,
} from './__generated__/TopicDescription.generated';

type Content = string | null | undefined;

interface ItemProps {
  label: 'Topic' | 'Description';
  content: Content;
  onClick: () => void;
}

const Item = ({ label, content, onClick }: ItemProps) => {
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

const topicSchema = object({
  topic: string()
    .min(1, { message: '- Minimum 1 character' })
    .max(250, { message: '- Maximum 250 characters' }),
});

interface TopicProps {
  discussionId: string;
  topic: Content;
}

const Topic = ({ discussionId, topic }: TopicProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useZodForm({
    schema: topicSchema,
  });

  const [updateTopic, { loading }] = useMutation<
    UpdateDiscussionTopicMutation,
    UpdateDiscussionTopicMutationVariables
  >(
    gql`
      mutation UpdateDiscussionTopicMutation(
        $input: UpdateDiscussionTopicInput!
      ) {
        updateDiscussionTopic(input: $input) {
          discussion {
            id
            topic
          }
        }
      }
    `,
    {
      onCompleted: () => {
        form.reset();
        setIsOpen(false);
      },
    }
  );

  const onSubmit = useCallback(
    ({ topic }: Zod.infer<typeof topicSchema>) =>
      updateTopic({
        variables: {
          input: {
            discussionId,
            topic,
          },
        },
      }),
    [updateTopic, discussionId]
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
                disabled={loading}
                isSubmitting={loading}
              >
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <Item label="Topic" content={topic} onClick={() => setIsOpen(true)} />
    </>
  );
};

const descriptionSchema = object({
  description: string()
    .min(1, { message: '- Minimum 1 character' })
    .max(250, { message: '- Maximum 250 characters' }),
});

interface DescriptionProps {
  discussionId: string;
  description: Content;
}

const Description = ({ discussionId, description }: DescriptionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useZodForm({
    schema: descriptionSchema,
  });

  const [updateDescription, { loading }] = useMutation<
    UpdateDiscussionDescriptionMutation,
    UpdateDiscussionDescriptionMutationVariables
  >(
    gql`
      mutation UpdateDiscussionDescriptionMutation(
        $input: UpdateDiscussionDescriptionInput!
      ) {
        updateDiscussionDescription(input: $input) {
          discussion {
            id
            description
          }
        }
      }
    `,
    {
      onCompleted: () => {
        form.reset();
        setIsOpen(false);
      },
    }
  );

  const onSubmit = useCallback(
    ({ description }: Zod.infer<typeof descriptionSchema>) =>
      updateDescription({
        variables: {
          input: {
            discussionId,
            description,
          },
        },
      }),
    [updateDescription, discussionId]
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
              <SButton
                size="sm"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </SButton>
              <Form.SubmitButton
                size="sm"
                disabled={loading}
                isSubmitting={loading}
              >
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
      <Item
        label="Description"
        content={description}
        onClick={() => setIsOpen(true)}
      />
    </>
  );
};

interface Props {
  discussion: DiscussionQuery['discussionById'];
}

const TopicDescription = ({ discussion }: Props) => {
  return (
    <div className="space-y-2">
      <Topic discussionId={discussion.id} topic={discussion.topic} />
      <Description
        discussionId={discussion.id}
        description={discussion.description}
      />
    </div>
  );
};

export default TopicDescription;
