import { useCallback, useState } from 'react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Title, Text } from '@spout/toolkit';
import { Editor } from '../../Editor';
import {
  Avatar,
  EmptyFallback,
  useToast,
} from '../../../../../shared/components';
import { formatMessageDate } from '../../../../../shared/utils';
import { Syllabus_classroom$key } from './__generated__/Syllabus_classroom.graphql';
import { SyllabusMutation } from './__generated__/SyllabusMutation.graphql';

const fragment = graphql`
  fragment Syllabus_classroom on Classroom {
    id
    name
    syllabus {
      content
      updatedAt
    }
    createdBy {
      name
      avatarUrl
      profileColor
    }
  }
`;

const mutation = graphql`
  mutation SyllabusMutation($input: UpsertClassroomSyllabusInput!) {
    upsertClassroomSyllabus(input: $input) {
      classroom {
        id
        syllabus {
          content
          updatedAt
        }
      }
    }
  }
`;

interface Props {
  classroom: Syllabus_classroom$key;
}

const Syllabus = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [commit, isInFlight] = useMutation<SyllabusMutation>(mutation);
  const { handleError } = useToast();

  const upsertSyllabus = useCallback(
    (content?: string | null) => {
      commit({
        variables: {
          input: {
            classroomId: classroom.id,
            content,
          },
        },
        onError: () => {
          handleError();
          setIsOpen(false);
        },
        onCompleted: () => {
          setIsEditing(false);
          setIsOpen(false);
        },
      });
    },
    [classroom.id, handleError, commit],
  );

  return (
    <article className="flex flex-col space-y-2.5">
      {!isEditing && classroom.syllabus && (
        <div className="!-mt-1.5 flex items-center justify-between">
          <div>
            <Title as="h3" variant="h4">
              Syllabus
            </Title>
            <Avatar
              src={classroom.createdBy.avatarUrl}
              name={classroom.createdBy.name}
              profileColor={classroom.createdBy.profileColor}
              containerProps={{ className: 'shadow-sm mr-1.5' }}
              size="sm"
            />
            <Text size="xs" as="span">
              {formatMessageDate(classroom.syllabus.updatedAt!)}
            </Text>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        </div>
      )}
      {classroom.syllabus || isEditing ? (
        <Editor
          onSave={(state) => upsertSyllabus(state)}
          onDelete={() => setIsOpen(true)}
          onCancel={() => setIsEditing(false)}
          isSaving={isInFlight}
          readOnly={!isEditing}
          initialStringifiedEditorState={classroom.syllabus?.content}
          showDelete={!!classroom.syllabus}
        />
      ) : (
        <EmptyFallback
          icon={
            <FontAwesomeIcon
              icon={faBookOpen}
              size="3x"
              className="text-gray-700"
            />
          }
          heading="No syllabus, yet"
          body="Adding a syllabus helps inform students on course expectations."
        >
          <Button onClick={() => setIsEditing(true)}>Add a syllabus</Button>
        </EmptyFallback>
      )}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header
            title="Delete Syllabus"
            description="Any attachments that are linked to this syllabus will also be lost."
            dismiss
          />
          <Modal.Footer>
            <Button variant="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:bg-red-700 focus-visible:ring-red-700 active:bg-red-800"
              loading={isInFlight}
              loadingText="Deleting..."
              onClick={() => upsertSyllabus(null)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </article>
  );
};

export default Syllabus;
