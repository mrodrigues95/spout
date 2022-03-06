import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { Portal } from '@headlessui/react';
import {
  faChevronRight,
  faArrowRightFromBracket,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Button,
  Text,
  Menu,
  usePopper,
  Skeleton,
  Link,
} from '@spout/toolkit';
import clsx from 'clsx';
import { UserInfoButtonQuery } from '../../../../../__generated__/UserInfoButtonQuery.graphql';
import { UserInfoButtonMutation } from '../../../../../__generated__/UserInfoButtonMutation.graphql';
import { useAuthRedirect } from '../../../../../modules';

export const UserInfoButtonSkeleton = () => {
  return (
    <div className="flex w-full items-center space-x-4 px-2">
      <Skeleton className="h-10 w-10" />
      <Skeleton.Stack vertical className="flex-1">
        <Skeleton className="w-2/2 h-3" />
        <Skeleton className="h-3 w-1/3" />
      </Skeleton.Stack>
    </div>
  );
};

const mutation = graphql`
  mutation UserInfoButtonMutation($input: LogoutInput!) {
    logout(input: $input) {
      authPayload {
        isLoggedIn
      }
    }
  }
`;

const query = graphql`
  query UserInfoButtonQuery {
    me {
      name
      email
      avatarUrl
    }
  }
`;

interface Props {
  fetchKey: number;
}

const UserInfoButton = ({ fetchKey }: Props) => {
  const authRedirect = useAuthRedirect();
  const [logout] = useMutation<UserInfoButtonMutation>(mutation);
  const { me } = useLazyLoadQuery<UserInfoButtonQuery>(query, {}, { fetchKey });

  const removeSession = async () => {
    const response = await fetch('/api/sessions/remove', {
      method: 'POST',
    });
    const sessionId = await response.json();
    logout({ variables: { input: { sessionId } }, onCompleted: authRedirect });
  };

  const [trigger, container] = usePopper({
    placement: 'right-end',
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top'],
        },
      },
    ],
  });

  return (
    <div className="px-2">
      <Menu>
        <Menu.Button
          ref={trigger}
          fullWidth
          variant="tertiary"
          leftIcon={<Avatar name={me!.name} scheme="orange" />}
          rightIcon={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
        >
          <div className="flex min-w-0 flex-1 flex-col">
            <Text as="span" size="sm" weight="semibold" color="dark" truncate>
              {me!.name}
            </Text>
            <Text size="xs" color="muted" truncate>
              {me!.email}
            </Text>
          </div>
        </Menu.Button>
        <Portal>
          <Menu.Items ref={container}>
            <Menu.Group className="flex items-center space-x-3.5 px-2 py-2">
              <Avatar name={me!.name} scheme="orange" />
              <div className="flex min-w-0 flex-1 flex-col">
                <Text
                  as="span"
                  size="sm"
                  weight="semibold"
                  color="dark"
                  truncate
                >
                  {me!.name}
                </Text>
                <Text size="xs" color="muted" truncate>
                  {me!.email}
                </Text>
              </div>
            </Menu.Group>
            <Menu.Group>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/settings"
                    leftIcon={<FontAwesomeIcon icon={faGear} />}
                    variant="tertiary"
                    size="sm"
                    className={clsx(
                      'block',
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white text-gray-500',
                    )}
                    fullWidth
                  >
                    Settings
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Button
                    leftIcon={
                      <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    }
                    variant="tertiary"
                    size="sm"
                    className={clsx(
                      'block',
                      active
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white text-gray-500',
                    )}
                    fullWidth
                    onClick={removeSession}
                  >
                    Logout
                  </Button>
                )}
              </Menu.Item>
            </Menu.Group>
          </Menu.Items>
        </Portal>
      </Menu>
    </div>
  );
};

export default UserInfoButton;
