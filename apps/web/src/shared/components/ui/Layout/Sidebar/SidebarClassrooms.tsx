import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Skeleton } from '@spout/toolkit';
import clsx from 'clsx';
import VerticalNav from '../../VerticalNav';
import { getRandomColor } from '../../../../../shared/utils';
import { QueryOptions } from './Sidebar';
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
  queryOptions: QueryOptions;
}

const SidebarClassrooms = ({ queryOptions }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<SidebarClassroomsQuery>(
    graphql`
      query SidebarClassroomsQuery {
        me {
          classrooms {
            id
            name
          }
        }
      }
    `,
    {},
    queryOptions,
  );

  if (!data.me?.classrooms.length) return null;

  return (
    <VerticalNav.Items>
      {data.me?.classrooms.map((classroom) => {
        const color = getRandomColor();

        return (
          <VerticalNav.Item
            key={classroom.id}
            to={`/classrooms/${classroom.id}/activity`}
            label={classroom.name}
            icon={
              <div
                className={clsx(
                  'h-3 w-3 rounded-md border-2',
                  color.bg,
                  color.border,
                )}
                aria-hidden="true"
              />
            }
            routes={[
              `/classrooms/${classroom.id}/activity`,
              `/classrooms/${classroom.id}/announcements`,
              `/classrooms/${classroom.id}/overview`,
              `/classrooms/${classroom.id}/reminders`,
              `/classrooms/${classroom.id}/discussions/${router.query.discussionId}`,
            ]}
          />
        );
      })}
      {/* <VerticalNav.Item
        to={`/classrooms/`}
        label={'name'}
        icon={
          <div
            className={clsx('h-3 w-3 rounded-md border-2')}
            aria-hidden="true"
          />
        }
        routes={[`/classrooms/${router.query.discussionId}`]}
      /> */}
    </VerticalNav.Items>
  );
};

export default SidebarClassrooms;
