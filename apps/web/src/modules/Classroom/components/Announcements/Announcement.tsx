import { useState } from 'react';
import { Portal } from '@headlessui/react';
import { graphql, useFragment, useMutation } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { isAfter } from 'date-fns';
import clsx from 'clsx';
import { Menu, Text, usePopper } from '@spout/toolkit';
import { ContentEditable, Editor } from '../Editor';
import { sharedUpdater } from './CreateAnnouncement';
import { Avatar, useToast } from '../../../../shared/components';
import { formatMessageDate } from '../../../../shared/utils';
import { Announcement_classroomAnnouncement$key } from './__generated__/Announcement_classroomAnnouncement.graphql';
import { AnnouncementDeleteMutation } from './__generated__/AnnouncementDeleteMutation.graphql';
import { AnnouncementEditMutation } from './__generated__/AnnouncementEditMutation.graphql';

const fragment = graphql`
  fragment Announcement_classroomAnnouncement on ClassroomAnnouncement {
    id
    content
    createdAt
    updatedAt
    createdBy {
      name
      avatarUrl
      profileColor
    }
  }
`;

const editMutation = graphql`
  mutation AnnouncementEditMutation($input: UpdateClassroomAnnouncementInput!) {
    updateClassroomAnnouncement(input: $input) {
      classroomAnnouncement {
        content
        updatedAt
      }
    }
  }
`;

const deleteMutation = graphql`
  mutation AnnouncementDeleteMutation(
    $input: DeleteClassroomAnnouncementInput!
  ) {
    deleteClassroomAnnouncement(input: $input) {
      classroomAnnouncement {
        id
        classroom {
          id
        }
      }
    }
  }
`;

interface AnnouncementProps {
  classroomAnnouncement: Announcement_classroomAnnouncement$key;
}

// TODO: Implement likes and comments maybe?
const Announcement = ({ ...props }: AnnouncementProps) => {
  const announcement = useFragment(fragment, props.classroomAnnouncement);
  const [editAnnouncement, isEditingInFlight] =
    useMutation<AnnouncementEditMutation>(editMutation);
  const [deleteAnnouncement, isDeleteInFlight] =
    useMutation<AnnouncementDeleteMutation>(deleteMutation);

  const { handleError } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [trigger, container] = usePopper({
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  });

  return (
    <div className="flex flex-col space-y-4 rounded-lg p-4 shadow-sm ring-2 ring-gray-900/5">
      <div className="flex items-center">
        <Avatar
          src={announcement.createdBy.avatarUrl}
          name={announcement.createdBy.name}
          profileColor={announcement.createdBy.profileColor}
          containerProps={{ className: 'shadow-md mr-2.5' }}
        />
        <div className="mr-auto">
          <Text size="sm" weight="semibold" className="-mb-1">
            {announcement.createdBy.name}
          </Text>
          <time
            className="text-xs font-medium text-gray-500"
            dateTime={announcement.createdAt}
          >
            {formatMessageDate(announcement.createdAt)}
          </time>
          {isAfter(
            new Date(announcement.updatedAt),
            new Date(announcement.createdAt),
          ) && (
            <Text as="span" size="xs" className="ml-1 italic">
              (edited)
            </Text>
          )}
        </div>
        {!isEditing && (
          <Menu className="w-auto">
            <Menu.Button
              ref={trigger}
              variant="tertiary"
              isIconButton
              aria-label="Open actions menu"
            >
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Menu.Button>
            <Portal>
              <Menu.Items ref={container}>
                <Menu.Group>
                  <Menu.Item
                    leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                    onClick={() => setIsEditing(true)}
                    loading={isDeleteInFlight}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftIcon={<FontAwesomeIcon icon={faTrash} />}
                    variant="danger"
                    loading={isDeleteInFlight}
                    onClick={() =>
                      deleteAnnouncement({
                        variables: {
                          input: {
                            classroomAnnouncementId: announcement.id,
                          },
                        },
                        onError: () => handleError(),
                        updater: (store) => {
                          const announcement = store
                            .getRootField('deleteClassroomAnnouncement')
                            .getLinkedRecord('classroomAnnouncement');

                          const classroomId = announcement
                            .getLinkedRecord('classroom')
                            .getValue('id');

                          sharedUpdater(
                            store,
                            classroomId,
                            announcement,
                            announcement.getValue('id'),
                          );
                        },
                      })
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Group>
              </Menu.Items>
            </Portal>
          </Menu>
        )}
      </div>
      <Editor
        onSave={(state) =>
          editAnnouncement({
            variables: {
              input: {
                classroomAnnouncementId: announcement.id,
                content: state,
              },
            },
            onError: () => handleError(),
            onCompleted: () => setIsEditing(false),
          })
        }
        onCancel={() => setIsEditing(false)}
        initialStringifiedEditorState={announcement.content}
        contentEditable={
          <ContentEditable className={clsx(!isEditing && 'p-0')} />
        }
        readOnly={!isEditing}
        isSaving={isEditingInFlight}
        containerProps={{
          className: 'relative shadow-none rounded-none ring-0',
        }}
      />
    </div>
  );
};

export default Announcement;
