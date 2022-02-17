import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Skeleton } from '@spout/toolkit';
import VerticalNav from '../../VerticalNav';
import Image from '../../Image';
import { getRandomAvatar } from '../../../../utils';
import { SidebarClassroomsQuery } from './__generated__/SidebarClassroomsQuery.graphql';

export const SidebarClassroomsSkeleton = () => {
  const stack = (
    <Skeleton.Stack vertical className="mt-2 pl-4">
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-full" />
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

interface Props {
  fetchKey: number;
}

const SidebarClassrooms = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<SidebarClassroomsQuery>(
    graphql`
      query SidebarClassroomsQuery {
        me {
          id
          classrooms {
            id
            name
          }
        }
      }
    `,
    {},
    { fetchKey },
  );

  return (
    <VerticalNav.Items>
      {data.me?.classrooms.map((classroom) => (
        <VerticalNav.Item
          key={classroom.id}
          to={`/classrooms/${classroom.id}`}
          label={classroom.name}
          icon={<Image src={getRandomAvatar()} alt="" size="sm" />}
          routes={[`/classrooms/${classroom.id}/${router.query.discussionId}`]}
        />
      ))}
    </VerticalNav.Items>
  );
};

export default SidebarClassrooms;
