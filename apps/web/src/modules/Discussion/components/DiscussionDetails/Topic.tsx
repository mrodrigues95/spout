import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Zod, { object, string } from 'zod';
import {
  Button,
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
import { Topic_user$key } from './__generated__/Topic_user.graphql';

interface ItemProps {
  label: 'Topic' | 'Description';
  isClassroomTeacher: boolean;
  content?: string | null;
  onClick: () => void;
}

export const Item = ({
  label,
  content,
  onClick,
  isClassroomTeacher,
}: ItemProps) => {
  const isLaptop = useMediaQuery(MEDIA_QUERIES.LARGE);
  const isButtonWrapper = !!content && isClassroomTeacher;
  const Component = isButtonWrapper ? Button : 'div';

  const item = (
    <Component
      className="relative flex w-full items-center justify-between space-x-4 rounded-md outline-none focus-visible:ring"
      {...(content && {
        variant: 'unstyled',
        'aria-labelledby': `spout-details-label-${generateId()}`,
        'aria-describedby': `spout-details-desc-${generateId()}`,
        onClick: () => (isClassroomTeacher ? onClick() : null),
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
      {isClassroomTeacher ? (
        <>
          {content ? (
            <Text className="text-gray-900" weight="medium" truncate>
              {content}
            </Text>
          ) : (
            <Button size="xs" className="rounded uppercase" onClick={onClick}>
              Edit
            </Button>
          )}
        </>
      ) : (
        <Text className="text-gray-900" weight="medium" truncate>
          {content || <i>None...</i>}
        </Text>
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

const topicFragment = graphql`
  fragment Topic_discussion on Discussion {
    id
    topic
  }
`;

const meFragment = graphql`
  fragment Topic_user on User
  @argumentDefinitions(classroomId: { type: "ID!" }) {
    isClassroomTeacher(classroomId: $classroomId)
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
  me: Topic_user$key;
  discussion: Topic_discussion$key;
}

const Topic = ({ ...props }: Props) => {
  const discussion = useFragment(topicFragment, props.discussion);
  const me = useFragment(meFragment, props.me);
  const [updateTopic, isInFlight] = useMutation<TopicMutation>(mutation);

  const [isOpen, setIsOpen] = useState(false);
  const { handleError } = useToast();

  const form = useZodForm({
    schema: topicSchema,
    defaultValues: { topic: discussion.topic },
  });

  const onSubmit = useCallback(
    ({ topic }: Zod.infer<typeof topicSchema>) =>
      updateTopic({
        variables: {
          input: {
            discussionId: discussion.id,
            topic,
          },
        },
        onError: () => handleError(),
        onCompleted: () => {
          setIsOpen(false);
        },
      }),
    [updateTopic, discussion.id, handleError],
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
              <Button size="sm" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Form.SubmitButton size="sm" loading={isInFlight}>
                Save
              </Form.SubmitButton>
            </Modal.Footer>
          </Form>
        </Modal.Content>
      </Modal>
      <Item
        label="Topic"
        content={discussion.topic}
        onClick={() => setIsOpen(true)}
        isClassroomTeacher={me.isClassroomTeacher}
      />
    </>
  );
};

export default Topic;
