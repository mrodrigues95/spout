import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { Link, Button, Skeleton } from '@spout/toolkit';
import { getRandomAvatar } from '../../../utils/getRandomAvatar';
import { UserInfoFragment } from '../../../../modules/Classrooms/Discussion/utils/fragments';
import { ClassroomsQuery } from './__generated__/Sidebar.generated';
import { Classroom } from '../../../../__generated__/schema.generated';
import { useIsCurrentRoute } from '../../../hooks';
import { ErrorFallback } from '../../../../shared/components';
import Search from '../Search';
import Avatar from '../Avatar';

const SidebarSkeleton = () => {
  const Component = (
    <Skeleton.Stack>
      <Skeleton h="h-3" w="w-1/2" />
      <Skeleton h="h-3" w="w-2/3" />
      <Skeleton h="h-3" w="w-full" />
    </Skeleton.Stack>
  );

  return (
    <>{Array.from([Component, Component, Component]).map((stack) => stack)}</>
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

const query = gql`
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
  const { data, loading, error, refetch } = useQuery<ClassroomsQuery>(query);

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
          <Button
            size="xs"
            variant="light"
            scheme="orange"
            className="uppercase rounded"
          >
            Create
          </Button>
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
              <SidebarItem classroom={classroom} />
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
