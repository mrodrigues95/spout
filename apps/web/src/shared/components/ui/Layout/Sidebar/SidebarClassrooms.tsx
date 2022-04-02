import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Skeleton } from '@spout/toolkit';
import clsx from 'clsx';
import VerticalNav from '../../VerticalNav';
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

// TODO: Implement classroom colors and grab these from the api.
const getRandomColor = () => {
  const colors: Record<string, { border: string; bg: string }> = {
    red: { border: 'border-red-300', bg: 'bg-red-400' },
    blue: { border: 'border-blue-300', bg: 'bg-blue-400' },
    purple: { border: 'border-violet-300', bg: 'bg-violet-400' },
    lime: { border: 'border-lime-300', bg: 'bg-lime-400' },
    pink: { border: 'border-pink-300', bg: 'bg-pink-400' },
  };
  const keys = Object.keys(colors);
  return colors[keys[Math.floor(Math.random() * keys.length)]];
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

  if (!data.me?.classrooms.length) return null;

  return (
    <VerticalNav.Items>
      {data.me?.classrooms.map((classroom) => {
        const color = getRandomColor();

        return (
          <VerticalNav.Item
            key={classroom.id}
            to={`/classrooms/${classroom.id}`}
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
              `/classrooms/${classroom.id}/${router.query.discussionId}`,
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
