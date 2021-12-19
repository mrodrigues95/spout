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
import { Button, Skeleton, Modal, Form, useZodForm } from '@spout/toolkit';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import { ClassroomInfoFragment } from '../../../../modules';
import { UserInfoFragment } from '../../../../modules/Classrooms/Discussion/utils/fragments';
import { useIsRedirecting } from '../../../hooks';
import { ErrorFallback, useToast } from '../../../../shared/components';
import {
  ClassroomsQuery,
  CreateClassroomMutation,
  CreateClassroomMutationVariables,
} from './__generated__/Sidebar.generated';
import Avatar from '../Avatar';
import Image from '../Image';
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
    refetchQueries: [query],
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

const query = gql`
  query ClassroomsQuery {
    me {
      ...UserInfo_user
      classrooms {
        ...ClassroomInfo_classroom
      }
    }
  }
  ${UserInfoFragment}
  ${ClassroomInfoFragment}
`;

const Sidebar = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(query);

  return (
    <aside className="fixed inset-y-0 left-0 overflow-y-auto flex flex-col z-20 p-5 space-y-8 w-72">
      <div className="flex items-center space-x-4">
        <Image src={getRandomAvatar()} alt="Spout" rounded />
        <span className="text-lg font-bold">spout</span>
      </div>
      <VerticalNav>
        <VerticalNav.Items>
          <VerticalNav.Item
            to="/home"
            label="Home"
            icon={<FontAwesomeIcon icon={faHome} className="text-gray-900" />}
          />
          <VerticalNav.Item
            to="/messages"
            label="Messages"
            icon={
              <FontAwesomeIcon icon={faCommentDots} className="text-gray-900" />
            }
          />
          <VerticalNav.Item
            to="/settings"
            label="Settings"
            icon={<FontAwesomeIcon icon={faCog} className="text-gray-900" />}
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
                    icon={<Image src={getRandomAvatar()} alt="" size="sm" />}
                    routes={[
                      `/classrooms/${classroom.id}/${router.query.discussionId}`,
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
