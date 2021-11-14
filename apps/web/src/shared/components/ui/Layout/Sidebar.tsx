import { useState } from 'react';
import { useRouter } from 'next/router';
import { object, string } from 'zod';
import { gql, useMutation, useQuery } from '@apollo/client';
import {
  Link,
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
import Search from '../Search';
import Avatar from '../Avatar';

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
    <Skeleton.Stack>
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

interface SidebarItemProps {
  classroom: Pick<Classroom, 'id' | 'name'>;
}

const SidebarItem = ({ classroom }: SidebarItemProps) => {
  const { query } = useRouter();

  const selected = useIsCurrentRoute([
    `/classrooms/${classroom.id}`,
    `/classrooms/${classroom.id}/${query.discussionId}`,
  ]);

  return (
    <li>
      <Link
        href={`/classrooms/${classroom.id}`}
        variant={selected ? 'light' : 'ghost'}
        fullWidth
        className="text-sm space-x-4"
      >
        <Avatar src={getRandomAvatar()} aria-hidden="true" />
        <span className="flex-1 truncate min-w-0">{classroom.name}</span>
      </Link>
    </li>
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
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(
    CLASSROOMS_QUERY
  );

  return (
    <aside className="flex flex-col px-4 space-y-8 max-w-xs">
      <div className="flex items-center justify-center space-x-6">
        <Avatar src={getRandomAvatar()} aria-hidden="true" />
        <Search placeholder="Search" />
      </div>
      <nav className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
            Classrooms
          </span>
          <CreateClassroom />
        </div>
        {loading && <SidebarSkeleton />}
        {error && (
          <ErrorFallback
            heading="We couldn't load any classrooms"
            action={refetch}
            className="!mt-48"
          />
        )}
        {data && (
          <ul className="space-y-2">
            {data.me?.classrooms?.map((classroom) => (
              <SidebarItem key={classroom.id} classroom={classroom} />
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
