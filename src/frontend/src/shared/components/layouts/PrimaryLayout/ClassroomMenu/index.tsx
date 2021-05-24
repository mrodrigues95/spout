import { Fragment, ReactNode, useContext } from 'react';
import { Popover, Transition, Portal } from '@headlessui/react';
import { Button, Link } from '~/shared/components';
import mockClassrooms from './utils/mockClassrooms';
import usePopper from '~/shared/hooks/usePopper';
import ClassroomMenuProvider, {
  ClassroomMenuContext,
  ActiveMenu,
} from './ClassroomMenuProvider';

const commonStyles =
  'flex items-center w-full rounded-md p-2 font-semibold tracking-wide text-sm text-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 focus:bg-orange-400 focus:text-white hover:bg-orange-400 hover:text-white';

type MenuItems = any[];

const DiscussionMenuItems = ({ discussions }: { discussions: MenuItems }) => {
  return (
    <>
      {discussions.map((discussion: any) => (
        <Link
          key={discussion.name}
          href={`/${discussion.id}`}
          className={commonStyles}
          ignoreStyles
        >
          {discussion.name}
        </Link>
      ))}
    </>
  );
};

const ClassroomMenuItems = ({ classrooms }: { classrooms: MenuItems }) => {
  const { setActiveMenu, setSelectedClassroom } = useContext(
    ClassroomMenuContext
  )!;

  return (
    <>
      {classrooms.map((classroom: any) => (
        <Button
          key={classroom.name}
          type="button"
          className={commonStyles}
          ignoreStyles
          onClick={() => {
            setActiveMenu(ActiveMenu.DISCUSSIONS);
            setSelectedClassroom(classroom);
          }}
        >
          {classroom.name}
        </Button>
      ))}
    </>
  );
};

interface MenuButtonProps {
  active: boolean;
  fullWidth: boolean;
  'aria-labelledby': string;
  children: ReactNode;
}

interface Props {
  menuButtonProps: MenuButtonProps;
}

// TODO: Add react-focus-lock.
const ClassroomMenu = ({ menuButtonProps }: Props) => {
  const {
    activeMenu,
    selectedClassroom,
    setActiveMenu,
    setSelectedClassroom,
  } = useContext(ClassroomMenuContext)!;
  const [trigger, container] = usePopper({
    placement: 'right-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  const { children, ...rest } = menuButtonProps;

  const resetMenu = () => {
    setActiveMenu(ActiveMenu.CLASSROOMS);
    setSelectedClassroom(null);
  };

  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <>
          <Popover.Button as={Button} ref={trigger} {...rest}>
            {children}
          </Popover.Button>
          <Portal>
            <div ref={container}>
              <Transition show={open}>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  beforeEnter={resetMenu}
                >
                  <Popover.Panel
                    static
                    className="w-64 mt-2 p-2 overflow-hidden bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                  >
                    {activeMenu === ActiveMenu.CLASSROOMS ? (
                      <ClassroomMenuItems classrooms={mockClassrooms} />
                    ) : (
                      <Transition.Child
                        enter="transform transition ease-in-out duration-100"
                        enterFrom="translate-x-10"
                        enterTo="translate-x-0"
                      >
                        <DiscussionMenuItems
                          discussions={selectedClassroom.discussions}
                        />
                      </Transition.Child>
                    )}
                  </Popover.Panel>
                </Transition.Child>
              </Transition>
            </div>
          </Portal>
        </>
      )}
    </Popover>
  );
};

const ClassroomMenuWithProvider = ({ menuButtonProps }: Props) => (
  <ClassroomMenuProvider>
    <ClassroomMenu menuButtonProps={menuButtonProps} />
  </ClassroomMenuProvider>
);

export default ClassroomMenuWithProvider;
