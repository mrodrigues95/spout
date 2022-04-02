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
import { ConditionalWrapper, useToast } from '../../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { TopicMutation } from './__generated__/TopicMutation.graphql';
import { Topic_discussion$key } from './__generated__/Topic_discussion.graphql';

interface ItemProps {
  label: 'Topic' | 'Description';
  content?: string | null;
  onClick: () => void;
}

export const Item = ({ label, content, onClick }: ItemProps) => {
  const isLaptop = useMediaQuery(MEDIA_QUERIES.LARGE);
  const Component = content ? SButton : 'div';

  const item = (
    <Component
      className="relative flex w-full items-center justify-between space-x-4 rounded-md outline-none focus-visible:ring"
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
        <SButton size="xs" className="rounded uppercase" onClick={onClick}>
          Edit
        </SButton>
      )}
    </Component>
  );

  return (
    <ConditionalWrapper
      condition={!!content && isLaptop}
      wrapper={(children) => (
        <Tooltip
          label={content}
          placement="left-start"
          className="block max-h-[40rem] max-w-[40rem] whitespace-pre-line break-words rounded-md bg-white p-2 shadow-md ring-1 ring-gray-900/5"
          unstyled
        >
          {children}
        </Tooltip>
      )}
    >
      {item}
    </ConditionalWrapper>
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
  topic: string().max(250, { message: '- Maximum 250 characters' }).nullable(),
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
    defaultValues: { topic: data.topic },
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
          setIsOpen(false);
        },
      }),
    [updateTopic, data.id, handleError],
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Edit Topic"
            description="Let people know what this discussion is focused on right now."
          />
          <Form form={form} onSubmit={onSubmit}>
            <Modal.Body>
              <Form.TextArea
                label="Topic"
                maxRows={10}
                className="resize-none"
                {...form.register('topic')}
              />
            </Modal.Body>
            <Modal.Footer>
              <SButton size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </SButton>
              <Form.SubmitButton size="sm" loading={isInFlight}>
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
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
