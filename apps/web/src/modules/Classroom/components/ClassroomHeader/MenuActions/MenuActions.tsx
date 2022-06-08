import { useReducer } from 'react';
import { Portal } from '@headlessui/react';
import {
  faEllipsisVertical,
  faTrash,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Menu, usePopper } from '@spout/toolkit';
import { Invite } from './Invite';
import { DeleteClassroom } from './DeleteClassroom';
import { graphql, useFragment } from 'react-relay';
import { MenuActions_classroom$key } from './__generated__/MenuActions_classroom.graphql';
import { MenuActions_user$key } from './__generated__/MenuActions_user.graphql';

export enum ActionType {
  Invite,
  DeleteClassroom,
}

export interface Action {
  type: ActionType;
  isOpen: boolean;
}

interface State {
  [ActionType.Invite]: { isOpen: boolean };
  [ActionType.DeleteClassroom]: { isOpen: boolean };
}

const initialState: State = {
  [ActionType.Invite]: { isOpen: false },
  [ActionType.DeleteClassroom]: { isOpen: false },
};

const reducer = (state: State, action: Action) => {
  const { type, isOpen } = action;

  switch (type) {
    case ActionType.Invite:
      return {
        ...state,
        [ActionType.Invite]: { isOpen },
      };
    case ActionType.DeleteClassroom:
      return {
        ...state,
        [ActionType.DeleteClassroom]: { isOpen },
      };
    default:
      return state;
  }
};

const classroomFragment = graphql`
  fragment MenuActions_classroom on Classroom {
    ...DeleteClassroom_classroom
  }
`;

const meFragment = graphql`
  fragment MenuActions_user on User {
    ...DeleteClassroom_user
  }
`;

interface Props {
  me: MenuActions_user$key;
  classroom: MenuActions_classroom$key;
}

const MenuActions = ({ ...props }: Props) => {
  const classroom = useFragment(classroomFragment, props.classroom);
  const me = useFragment(meFragment, props.me);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [trigger, container] = usePopper();

  return (
    <>
      {state[ActionType.Invite].isOpen && <Invite dispatch={dispatch} />}
      {state[ActionType.DeleteClassroom].isOpen && (
        <DeleteClassroom dispatch={dispatch} classroom={classroom} me={me} />
      )}
      <Menu>
        <Menu.Button
          ref={trigger}
          as={IconButton}
          icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
          aria-label="Open menu"
          variant="tertiary"
          className="h-8 w-8"
        />
        <Portal>
          <Menu.Items ref={container}>
            <Menu.Group>
              <Menu.Item
                onClick={() =>
                  dispatch({ type: ActionType.Invite, isOpen: true })
                }
                leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
              >
                Invite
              </Menu.Item>
            </Menu.Group>
            <Menu.Group>
              <Menu.Item
                onClick={() =>
                  dispatch({ type: ActionType.DeleteClassroom, isOpen: true })
                }
                leftIcon={<FontAwesomeIcon icon={faTrash} />}
                variant="danger"
              >
                Delete classroom
              </Menu.Item>
            </Menu.Group>
          </Menu.Items>
        </Portal>
      </Menu>
    </>
  );
};

export default MenuActions;
