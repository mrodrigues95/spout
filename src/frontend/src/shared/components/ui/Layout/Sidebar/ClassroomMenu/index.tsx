import { Fragment, ReactNode, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Popover, Transition, Portal } from '@headlessui/react';
import clsx from 'clsx';
import {
  Button,
  ButtonOrLink,
  ButtonOrLinkProps,
  ErrorFallback,
  EmptyFallback,
  Spinner,
} from '~/shared/components';
import usePopper from '~/shared/hooks/usePopper';
import ClassroomMenuProvider, {
  ClassroomMenuContext,
  ActiveMenu,
} from './ClassroomMenuProvider';
import { ClassroomsQuery } from './__generated__/index.generated';
import { Classroom, Discussion } from '~/__generated__/schema.generated';

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

type MenuItems = Partial<Classroom>[] | Partial<Discussion>[];

const DiscussionMenuItems = ({ discussions }: { discussions: MenuItems }) => {
  return (
    <>
      <div className="max-h-52 -mb-1 p-1 overflow-auto">
        {discussions && discussions.length ? (
          discussions.map((discussion: any) => (
            <ClassroomMenuItem
              key={discussion.id}
              href={`/discussion/${discussion.id}`}
              variant="default"
            >
              {discussion.name}
            </ClassroomMenuItem>
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
      <ClassroomMenuSeperator />
      <ClassroomMenuItem
        type="button"
        variant="info"
        onClick={() => console.log('Create a discussion clicked!')}
      >
        Create discussion
      </ClassroomMenuItem>
      <ClassroomMenuItem
        type="button"
        variant="info"
        onClick={() => console.log('Invite students clicked!')}
      >
        Invite students
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
      <div className="max-h-52 -mb-1 p-1 overflow-auto">
        {classrooms && classrooms.length ? (
          classrooms.map((classroom: any) => (
            <ClassroomMenuItem
              key={classroom.id}
              type="button"
              variant="default"
              onClick={() => {
                setActiveMenu(ActiveMenu.DISCUSSIONS);
                setSelectedClassroom(classroom);
              }}
            >
              {classroom.name}
            </ClassroomMenuItem>
          ))
        ) : (
          <div className="my-4">
            <EmptyFallback
              message="There's nothing here, yet."
              submessage="Use the button below to create your first classroom."
            />
          </div>
        )}
      </div>
      <ClassroomMenuSeperator />
      <ClassroomMenuItem
        type="button"
        variant="info"
        onClick={() => console.log('Create a classroom clicked!')}
      >
        Create a classroom
      </ClassroomMenuItem>
    </>
  );
};

const ClassroomMenuSeperator = () => {
  return (
    <hr
      className="my-1 w-full border border-gray-100"
      role="separator"
      aria-orientation="horizontal"
    />
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
        'block w-full rounded-md p-2 text-left font-bold tracking-wide text-sm truncate focus:outline-none focus-visible:ring',
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
// `Popover` component for reuse.
const ClassroomMenu = ({ menuButtonProps }: Props) => {
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(
    gql`
      query ClassroomsQuery {
        me {
          classrooms {
            id
            name
            discussions {
              id
              name
            }
          }
        }
      }
    `
  );

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
                    as="section"
                    className="p-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden"
                    aria-labelledby="spout-popover-header"
                    style={{ minWidth: '20rem' }}
                  >
                    {loading && <Spinner className="h-5 w-5 text-black" />}
                    {error && (
                      <ErrorFallback message={error.message} action={refetch} />
                    )}
                    {data && activeMenu === ActiveMenu.CLASSROOMS && (
                      <>
                        <ClassroomMenuHeader>Classrooms</ClassroomMenuHeader>
                        {/* TODO: Fix ugly type casting... */}
                        <ClassroomMenuItems
                          classrooms={
                            (data.me?.classrooms as unknown) as Classroom[]
                          }
                        />
                      </>
                    )}
                    {selectedClassroom &&
                      activeMenu === ActiveMenu.DISCUSSIONS && (
                        <Transition.Child
                          enter="pointer-events-none transform transition ease-in-out duration-150"
                          enterFrom="translate-x-10"
                          enterTo="translate-x-0"
                        >
                          <>
                            <ClassroomMenuHeader>
                              {selectedClassroom.name}{' '}
                              <span aria-hidden="true">/</span> Discussions
                            </ClassroomMenuHeader>
                            {/* TODO: Fix ugly type casting... */}
                            <DiscussionMenuItems
                              discussions={
                                (selectedClassroom.discussions as unknown) as Discussion[]
                              }
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
