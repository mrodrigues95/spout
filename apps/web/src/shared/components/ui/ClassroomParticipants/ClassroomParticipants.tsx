import { Suspense } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { Button, Spinner } from '@spout/toolkit';
import Avatar from '../Avatar';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
import { ClassroomParticipantsQuery } from './__generated__/ClassroomParticipantsQuery.graphql';

const query = graphql`
  query ClassroomParticipantsQuery($id: ID!) {
    classroomById(id: $id) {
      users {
        id
        avatarUrl
        name
        profileColor
      }
    }
  }
`;

interface Props {
  fetchKey: number;
}

const ClassroomParticipants = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ClassroomParticipantsQuery>(
    query,
    {
      id: router.query.classroomId as string,
    },
    { fetchKey },
  );

  return (
    <div className="relative h-full">
      <ul className="absolute inset-0 space-y-3 overflow-y-auto overflow-x-hidden p-2">
        {data.classroomById.users.map((user) => (
          <li key={user.id}>
            <Button
              size="sm"
              variant="tertiary"
              leftIcon={
                <Avatar
                  src={user.avatarUrl}
                  name={user.name}
                  profileColor={user.profileColor}
                  containerProps={{ className: 'shadow-sm' }}
                  size="sm"
                />
              }
              fullWidth
            >
              <span className="min-w-0 flex-1 truncate">{user.name}</span>
            </Button>
          </li>
        ))}
      </ul>
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
