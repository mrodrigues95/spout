import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { DiscussionQuery } from '../components/__generated__/Discussion.generated';
import { FeelingBlueIllustration } from '~/shared/assets';
import {
  PrimaryLayout,
  Spinner,
  ErrorFallback,
  Container,
} from '~/shared/components';
import DiscussionContainer from './DiscussionContainer';
import { UserInfoFragment } from '../utils/fragments';

const query = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
      users {
        ...UserInfo_user
      }
    }
  }
  ${UserInfoFragment}
`;

const Discussion = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(query, {
    variables: { id: router.query.discussionId as string },
  });

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
        {data && <DiscussionContainer discussion={data.discussionById} />}
      </PrimaryLayout>
    </>
  );
};

export default Discussion;
