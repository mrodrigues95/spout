import { Fragment, ReactNode, useContext } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Popover, Transition, Portal } from '@headlessui/react';
import { Spinner, Button, ButtonOrLinkProps } from '@spout/toolkit';
import { usePopper } from '@spout/utils';
import { ClassroomsQuery } from './__generated__/index.generated';
import {
  Classroom,
  Discussion,
} from '../../../../../../__generated__/schema.generated';
import { UserInfoFragment } from '../../../../../../modules/Discussion/utils/fragments';
import ErrorFallback from '../../../ErrorFallback';
import MenuProvider, { MenuContext } from './MenuProvider';
import MenuSeperator from './components/MenuSeperator';
import MenuHeader from './components/MenuHeader';
import MenuItem from './components/MenuItem';
import ClassroomMenu from './components/ClassroomMenu';
import DiscussionMenu from './components/DiscussionMenu';
import JoinClassroom from './components/Modals/JoinClassroom';
import CreateClassroom from './components/Modals/CreateClassroom';

export const menuVariants = {
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

interface MenuButtonProps extends ButtonOrLinkProps {
  children: ReactNode;
}

interface Props {
  menuButtonProps: MenuButtonProps;
}

export const query = gql`
  query ClassroomsQuery {
    me {
      ...UserInfo_user
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
  ${UserInfoFragment}
`;

const BaseMenu = ({ menuButtonProps }: Props) => {
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(query);

  const {
    currentModal,
    setCurrentMenu,
    setCurrentModal,
    selectedClassroom,
    setSelectedClassroom,
  } = useContext(MenuContext)!;

  const [trigger, container] = usePopper({
    placement: 'right-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 20] } }],
  });

  const { children, ...rest } = menuButtonProps;

  const resetMenu = () => {
    setCurrentMenu('classroom');
    setCurrentModal(null);
    setSelectedClassroom(null);
  };

  const classrooms = (data?.me?.classrooms as unknown) as Classroom[];
  const discussions = (selectedClassroom?.discussions as unknown) as Discussion[];

  return (
    <>
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
                      {loading && <Spinner size="sm" />}
                      {error && (
                        <ErrorFallback
                          heading={error.message}
                          action={refetch}
                        />
                      )}
                      {data && (
                        <>
                          <ClassroomMenu classrooms={classrooms} />
                          <DiscussionMenu discussions={discussions} />
                        </>
                      )}
                    </Popover.Panel>
                  </Transition.Child>
                </Transition>
              </div>
            </Portal>
          </>
        )}
      </Popover>
      {currentModal === 'join' && <JoinClassroom />}
      {currentModal === 'create-classroom' && <CreateClassroom />}
    </>
  );
};

const Menu = ({ menuButtonProps }: Props) => (
  <MenuProvider>
    <BaseMenu menuButtonProps={menuButtonProps} />
  </MenuProvider>
);

Menu.Header = MenuHeader;
Menu.Seperator = MenuSeperator;
Menu.Item = MenuItem;

export default Menu;
