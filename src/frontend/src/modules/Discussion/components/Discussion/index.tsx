import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FeelingBlueIllustration } from '~/shared/assets';
import {
  PrimaryLayout,
  Spinner,
  ErrorFallback,
  Container,
} from '~/shared/components';
import DiscussionContainer from '../DiscussionContainer';
import DisucssionActionsMenu from '../DiscussionActionsMenu';
import { DiscussionQuery } from './__generated__/index.generated';

export const USER_INFO_FRAGMENT = gql`
  fragment UserInfo_user on User {
    id
    name
  }
`;

export const DISCUSSION_QUERY = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
      users {
        ...UserInfo_user
      }
    }
  }
  ${USER_INFO_FRAGMENT}
`;

const Discussion = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(
    DISCUSSION_QUERY,
    {
      variables: { id: router.query.discussionId },
    }
  );

  // TODO: Loading/error state.
  return (
    <>
      <PrimaryLayout title={data?.discussionById.name ?? 'Discussion'}>
        {loading && <Spinner className="h-5 w-5 text-black" />}
        {error && (
          <Container>
            <Container.Header />
            <ErrorFallback
              icon={<FeelingBlueIllustration className="w-full h-64" />}
              message="Sorry, we can't load this discussion right now."
              action={refetch}
            />
          </Container>
        )}
        {data && <DiscussionContainer members={data.discussionById.users} />}
      </PrimaryLayout>
    </>
  );
};

export default Discussion;
