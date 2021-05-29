import { Fragment, ReactNode, useContext } from 'react';
import { Popover, Transition, Portal } from '@headlessui/react';
import clsx from 'clsx';
import { Button, ButtonOrLink, ButtonOrLinkProps } from '~/shared/components';
import mockClassrooms from './utils/mockClassrooms';
import usePopper from '~/shared/hooks/usePopper';
import ClassroomMenuProvider, {
  ClassroomMenuContext,
  ActiveMenu,
} from './ClassroomMenuProvider';

const menuVariants = {
  default: {
    base: 'text-black',
    active:
      'focus-visible:ring-orange-500 focus-visible:ring-opacity-50 focus:bg-orange-400 focus:text-white hover:bg-orange-400 hover:text-white',
  },
  primary: {
    base: 'text-green-700',
    active:
      'focus-visible:ring-green-600 focus-visible:ring-opacity-50 focus:bg-green-700 focus:text-white hover:bg-green-700 hover:text-white',
  },
  info: {
    base: 'text-indigo-700',
    active:
      'focus-visible:ring-indigo-600 focus-visible:ring-opacity-50 focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 hover:text-white',
  },
  danger: {
    base: 'text-red-700',
    active:
      'focus-visible:ring-red-600 focus-visible:ring-opacity-50 focus:bg-red-700 focus:text-white hover:bg-red-700 hover:text-white',
  },
};

type MenuItems = any[];

const DiscussionMenuItems = ({ discussions }: { discussions: MenuItems }) => {
  return (
    <>
      <div className="max-h-52 p-1 overflow-y-scroll">
        {discussions.map((discussion: any) => (
          <ClassroomMenuItem
            key={discussion.name}
            href={`/${discussion.id}`}
            variant="default"
          >
            {discussion.name}
          </ClassroomMenuItem>
        ))}
      </div>
      <ClassroomMenuSeperator />
      <ClassroomMenuItem
        type="button"
        variant="info"
        onClick={() => console.log('Invite students clicked!')}
      >
        Invite students
      </ClassroomMenuItem>
      <ClassroomMenuItem
        type="button"
        variant="primary"
        onClick={() => console.log('Create a discussion clicked!')}
      >
        Create a discussion
      </ClassroomMenuItem>
      <ClassroomMenuSeperator />
      <ClassroomMenuItem
        type="button"
        variant="danger"
        onClick={() => console.log('Delete classroom clicked!')}
      >
        Delete classroom
      </ClassroomMenuItem>
    </>
  );
};

const ClassroomMenuItems = ({ classrooms }: { classrooms: MenuItems }) => {
  const { setActiveMenu, setSelectedClassroom } = useContext(
    ClassroomMenuContext
  )!;

  return (
    <>
      <div className="max-h-52 p-1 overflow-y-auto">
        {classrooms.map((classroom: any) => (
          <ClassroomMenuItem
            key={classroom.name}
            type="button"
            variant="default"
            onClick={() => {
              setActiveMenu(ActiveMenu.DISCUSSIONS);
              setSelectedClassroom(classroom);
            }}
          >
            {classroom.name}
          </ClassroomMenuItem>
        ))}
      </div>
      <ClassroomMenuSeperator />
      <ClassroomMenuItem
        type="button"
        variant="primary"
        onClick={() => console.log('Create a classroom clicked!')}
      >
        Create a classroom
      </ClassroomMenuItem>
    </>
  );
};

const ClassroomMenuSeperator = () => {
  return (
    <div className="p-1" aria-hidden="true">
      <div className="w-full border border-gray-100"></div>
    </div>
  );
};

interface ClassroomMenuItemProps extends Omit<ButtonOrLinkProps, 'variant'> {
  variant: keyof typeof menuVariants;
}

const ClassroomMenuItem = ({ variant, ...props }: ClassroomMenuItemProps) => {
  const styles = menuVariants[variant];

  const Item = ButtonOrLink;
  return (
    <Item
      className={clsx(
        'block w-full rounded-md p-2 text-left font-semibold tracking-wide text-sm truncate focus:outline-none focus-visible:ring',
        styles.base,
        styles.active
      )}
      {...props}
    />
  );
};

const ClassroomMenuHeader = ({ children }: { children: ReactNode }) => {
  return (
    <p
      id="spout-popover-header"
      className="p-2 uppercase text-gray-500 font-bold text-xs tracking-wide truncate"
    >
      {children}
    </p>
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

// TODO: Ideally, we could extract alot of this logic into our own
// `Popover` component for re-use.
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
                    as="section"
                    static
                    className="w-72 p-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    aria-labelledby="spout-popover-header"
                  >
                    {activeMenu === ActiveMenu.CLASSROOMS ? (
                      <>
                        <ClassroomMenuHeader>Classrooms</ClassroomMenuHeader>
                        <ClassroomMenuItems classrooms={mockClassrooms} />
                      </>
                    ) : (
                      <Transition.Child
                        enter="pointer-events-none transform transition ease-in-out duration-150"
                        enterFrom="translate-x-10"
                        enterTo="translate-x-0"
                      >
                        <>
                          <ClassroomMenuHeader>Discussions</ClassroomMenuHeader>
                          <DiscussionMenuItems
                            discussions={selectedClassroom.discussions}
                          />
                        </>
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
