import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FileFragment, UserInfoFragment } from '../../utils/fragments';
import {
  DiscussionFilesQuery as _DiscussionFilesQuery,
  MeQuery as _MeQuery,
} from './__generated__/Attachments.generated';

const MeQuery = gql`
  query MeQuery {
    me {
      ...UserInfo_user
    }
  }
  ${UserInfoFragment}
`;

const DiscussionFilesQuery = gql`
  query DiscussionFilesQuery(
    $discussionId: ID!
    $uploadedById: ID!
    $after: String
  ) {
    files(
      first: 50
      after: $after
      where: {
        messageFiles: {
          some: { message: { discussion: { id: { eq: $discussionId } } } }
        }
        and: {
          isDeleted: { eq: false }
          uploadStatus: { eq: null }
          uploadedBy: { id: { eq: $uploadedById } }
        }
      }
      order: { createdAt: DESC }
    ) {
      edges {
        node {
          ...File_file
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
  ${FileFragment}
`;

const Attachments = () => {
  const router = useRouter();
  const meData = useQuery<_MeQuery>(MeQuery, { fetchPolicy: 'cache-only' });

  const {
    data,
    loading,
    error,
    refetch,
    fetchMore,
  } = useQuery<_DiscussionFilesQuery>(DiscussionFilesQuery, {
    variables: {
      discussionId: router.query.discussionId as string,
      uploadedById: meData.data!.me!.id,
    },
  });

  console.log(error)

  console.log(data);

  return <span>attachments</span>;
};

export default Attachments;
