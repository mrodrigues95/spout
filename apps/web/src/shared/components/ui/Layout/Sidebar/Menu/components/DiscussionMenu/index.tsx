import { useContext } from 'react';
import { Transition } from '@headlessui/react';
import { Discussion } from '../../../../../../../../__generated__/schema.generated';
import EmptyFallback from '../../../../../EmptyFallback';
import Menu from '../..';
import { MenuContext } from '../../MenuProvider';

interface Props {
  discussions: Partial<Discussion>[];
}

const DiscussionMenu = ({ discussions }: Props) => {
  const { currentMenu, selectedClassroom } = useContext(MenuContext)!;

  if (!selectedClassroom || currentMenu !== 'discussion') return null;

  // TODO: Use shallow routing for navigating between discussions.
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
        {discussions.length ? (
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
              heading="There's nothing here, yet."
              body="Use the button below to create your first discussion."
            />
          </div>
        )}
      </div>
      <Menu.Seperator />
      <Menu.Item
        href={`/classrooms/${selectedClassroom.id}`}
        target="_blank"
        variant="info"
      >
        View Classroom
      </Menu.Item>
    </Transition.Child>
  );
};

export default DiscussionMenu;
