import { useContext } from 'react';
import { Transition } from '@headlessui/react';
import { Discussion } from '~/__generated__/schema.generated';
import EmptyFallback from '../../../../../EmptyFallback';
import Menu from '../..';
import { Menu as MenuEnum, Modal, MenuContext } from '../../MenuProvider';

interface Props {
  discussions: Partial<Discussion>[];
}

const DiscussionMenu = ({ discussions }: Props) => {
  const { currentMenu, selectedClassroom, setCurrentModal } = useContext(
    MenuContext
  )!;

  if (!selectedClassroom || currentMenu !== MenuEnum.Discussions) return null;

  return (
    <Transition.Child
      enter="pointer-events-none transform transition ease-in-out duration-150"
      enterFrom="translate-x-10"
      enterTo="translate-x-0"
    >
      <Menu.Header>
        {selectedClassroom.name} <span aria-hidden="true">/</span> Discussions
      </Menu.Header>
      <div className="max-h-52 -mb-1 p-1 overflow-auto">
        {discussions && discussions.length ? (
          discussions.map((discussion: any) => (
            <Menu.Item
              key={discussion.id}
              href={`/discussion/${discussion.id}`}
              variant="default"
            >
              {discussion.name}
            </Menu.Item>
          ))
        ) : (
          <div className="my-4">
            <EmptyFallback
              message="There's nothing here, yet."
              submessage="Use the button below to create your first discussion."
            />
          </div>
        )}
      </div>
      <Menu.Seperator />
      <Menu.Item
        type="button"
        variant="info"
        onClick={() => console.log('Create a discussion clicked!')}
      >
        Create Discussion
      </Menu.Item>
      <Menu.Item
        type="button"
        variant="info"
        onClick={() => setCurrentModal(Modal.InviteStudents)}
      >
        Invite Students
      </Menu.Item>
      <Menu.Seperator />
      <Menu.Item
        type="button"
        variant="danger"
        onClick={() => console.log('Delete classroom clicked!')}
      >
        Delete Classroom
      </Menu.Item>
    </Transition.Child>
  );
};

export default DiscussionMenu;
