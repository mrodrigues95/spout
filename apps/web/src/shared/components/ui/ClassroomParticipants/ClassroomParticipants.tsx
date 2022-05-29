import { Suspense } from 'react';
import { graphql, useLazyLoadQuery, usePaginationFragment } from 'react-relay';
import { useRouter } from 'next/router';
import { Button, Spinner } from '@spout/toolkit';
import { useConnection } from '../../../hooks';
import Avatar from '../Avatar';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import { ClassroomParticipantsQuery } from './__generated__/ClassroomParticipantsQuery.graphql';
import { ClassroomParticipants_classroom$key } from './__generated__/ClassroomParticipants_classroom.graphql';

interface ClassroomParticipantsListProps {
  classroom: ClassroomParticipants_classroom$key;
}

const ClassroomParticipantsList = ({
  ...props
}: ClassroomParticipantsListProps) => {
  const { data: classroom } = usePaginationFragment(
    graphql`
      fragment ClassroomParticipants_classroom on Classroom
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 50 }
        cursor: { type: "String" }
      )
      @refetchable(queryName: "ClassroomParticipantsListPaginationQuery") {
        users(first: $count, after: $cursor)
          @connection(key: "ClassroomParticipantsList_classroom_users") {
          edges {
            node {
              id
              avatarUrl
              name
              profileColor
            }
          }
        }
      }
    `,
    props.classroom,
  );

  const participants = useConnection(classroom.users);

  return (
    <ul className="absolute inset-0 space-y-3 overflow-y-auto overflow-x-hidden p-2">
      {participants.map((participant) => (
        <li key={participant.id}>
          <Button
            size="sm"
            variant="tertiary"
            leftIcon={
              <Avatar
                src={participant.avatarUrl}
                name={participant.name}
                profileColor={participant.profileColor}
                containerProps={{ className: 'shadow-sm' }}
                size="sm"
              />
            }
            fullWidth
          >
            <span className="min-w-0 flex-1 truncate">{participant.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
};

interface Props {
  fetchKey: number;
}

const ClassroomParticipants = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ClassroomParticipantsQuery>(
    graphql`
      query ClassroomParticipantsQuery($id: ID!) {
        classroomById(id: $id) {
          ...ClassroomParticipants_classroom
        }
      }
    `,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey },
  );

  return (
    <div className="relative h-full">
      <ClassroomParticipantsList classroom={data.classroomById!} />
    </div>
  );
};

const ClassroomParticipantsWithSuspense = () => {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <ErrorFallback
          heading="We couldn't load any participants."
          action={resetErrorBoundary}
        />
      )}
    >
      {({ fetchKey }) => (
        <Suspense fallback={<Spinner center size="lg" className="flex-1" />}>
          <ClassroomParticipants fetchKey={fetchKey} />
        </Suspense>
      )}
    </ErrorBoundary>
  );
};

export default ClassroomParticipantsWithSuspense;
