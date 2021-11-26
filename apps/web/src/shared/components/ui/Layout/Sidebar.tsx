import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCommentDots,
  faCog,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { object, string } from 'zod';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Skeleton,
  Modal,
  Form,
  useZodForm,
} from '@spout/toolkit';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import { UserInfoFragment } from '../../../../modules/Classrooms/Discussion/utils/fragments';
import { Classroom } from '../../../../__generated__/schema.generated';
import { useIsCurrentRoute, useIsRedirecting } from '../../../hooks';
import { ErrorFallback, useToast } from '../../../../shared/components';
import {
  ClassroomsQuery,
  CreateClassroomMutation,
  CreateClassroomMutationVariables,
} from './__generated__/Sidebar.generated';
import Avatar from '../Avatar';
import VerticalNav from '../VerticalNav';

const schema = object({
  name: string().min(1, '- Invalid name').max(64, '- Invalid name'),
});

const mutation = gql`
  mutation CreateClassroomMutation($input: CreateClassroomInput!) {
    createClassroom(input: $input) {
      classroom {
        id
        name
      }
    }
  }
`;

const CreateClassroom = () => {
  const router = useRouter();
  const isRedirecting = useIsRedirecting();
  const { handleError } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [createClassroom, result] = useMutation<
    CreateClassroomMutation,
    CreateClassroomMutationVariables
  >(mutation, {
    onError: (error) => handleError(error),
    onCompleted: ({ createClassroom }) => {
      setIsOpen(false);
      router.push(`/classrooms/${createClassroom.classroom.id}`);
    },
    refetchQueries: [CLASSROOMS_QUERY],
    awaitRefetchQueries: true,
  });

  const form = useZodForm({
    schema,
  });

  return (
    <>
      <Button
        size="xs"
        variant="light"
        scheme="orange"
        className="uppercase rounded"
        onClick={() => setIsOpen(true)}
      >
        Create
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Overlay />
        <Form
          form={form}
          onSubmit={({ name }) =>
            createClassroom({ variables: { input: { name } } })
          }
        >
          <Modal.Content>
            <Modal.Header
              title="Create Your Classroom"
              description="Classrooms help you better manage your discussions."
              dismiss
            />
            <Modal.Body>
              <Form.Input
                label="Classroom Name"
                placeholder="PROG3120 - Programming Fundamentals"
                {...form.register('name')}
              />
            </Modal.Body>
            <Modal.Footer>
              <Form.SubmitButton
                disabled={result.loading || isRedirecting}
                size="sm"
                className="font-semibold"
              >
                Create Classroom
              </Form.SubmitButton>
            </Modal.Footer>
          </Modal.Content>
        </Form>
      </Modal>
    </>
  );
};

const SidebarSkeleton = () => {
  const stack = (
    <Skeleton.Stack className="pl-4">
      <Skeleton h="h-3" w="w-1/2" />
      <Skeleton h="h-3" w="w-2/3" />
      <Skeleton h="h-3" w="w-full" />
    </Skeleton.Stack>
  );

  return (
    <>
      {stack}
      {stack}
      {stack}
    </>
  );
};

const CLASSROOMS_QUERY = gql`
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

const Sidebar = () => {
  const { query } = useRouter();
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(
    CLASSROOMS_QUERY
  );

  return (
    <aside className="flex flex-col p-5 space-y-8 max-w-xs">
      <div className="flex items-center space-x-4">
        <Avatar src={getRandomAvatar()} aria-hidden="true" />
        <span className="text-lg font-bold">spout</span>
      </div>
      <VerticalNav>
        <VerticalNav.Items>
          <VerticalNav.Item
            to="/home"
            label="Home"
            icon={
              <FontAwesomeIcon icon={faHome} className="w-6 h-6 text-blueGray-900" fixedWidth />
            }
          />
          <VerticalNav.Item
            to="/messages"
            label="Messages"
            icon={
              <FontAwesomeIcon
                icon={faCommentDots}
                className="w-6 h-6 text-blueGray-900"
                fixedWidth
              />
            }
          />
          <VerticalNav.Item
            to="/settings"
            label="Settings"
            icon={
              <FontAwesomeIcon icon={faCog} className="w-6 h-6 text-blueGray-900" fixedWidth />
            }
          />
          <VerticalNav.Item
            isGroup
            groupTitle="Classrooms"
            groupActions={<CreateClassroom />}
          >
            {loading && <SidebarSkeleton />}
            {error && (
              <ErrorFallback
                heading="We couldn't load any classrooms"
                action={refetch}
                className="!mt-48"
              />
            )}
            {data && (
              <VerticalNav.Items>
                {data.me!.classrooms?.map((classroom) => (
                  <VerticalNav.Item
                    key={classroom.id}
                    to={`/classrooms/${classroom.id}`}
                    label={classroom.name}
                    icon={
                      <Avatar
                        src={getRandomAvatar()}
                        size="xs"
                        aria-hidden="true"
                      />
                    }
                    routes={[
                      `/classrooms/${classroom.id}/${query.discussionId}`,
                    ]}
                  />
                ))}
              </VerticalNav.Items>
            )}
          </VerticalNav.Item>
        </VerticalNav.Items>
      </VerticalNav>
    </aside>
  );
};

export default Sidebar;
