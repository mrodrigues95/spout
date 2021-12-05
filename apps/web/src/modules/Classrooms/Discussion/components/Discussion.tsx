import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faChevronCircleDown,
  faChevronDown,
  faEye,
  faInfo,
  faInfoCircle,
  faPencilAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Title, Text, Select, Button, IconButton } from '@spout/toolkit';
import { DiscussionQuery } from './__generated__/Discussion.generated';
import { Layout, Container } from '../../../../shared/components';
import Messages from './Messages';

const query = gql`
  query DiscussionQuery($id: ID!) {
    discussionById(id: $id) {
      id
      name
    }
  }
`;

const Discussion = () => {
  const router = useRouter();
  const { data, loading, error, refetch } = useQuery<DiscussionQuery>(query, {
    variables: { id: router.query.discussionId as string },
  });

  const title = data?.discussionById.name ?? 'Discussion';

  return (
    <Layout title={title}>
      <Container
        title={title}
        isLoading={loading}
        isError={error}
        refetch={refetch}
      >
        {data && (
          <>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Title as="h1" variant="h4">
                  # Discussion Name
                </Title>
                <Text color="muted" weight="medium">
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    size="sm"
                    className="mr-2"
                  />
                  Description
                </Text>
              </div>
              <div className="flex items-center space-x-3">
                <Select value="test" onChange={() => {}}>
                  <Select.Button
                    label="discussion"
                    icon={<FontAwesomeIcon icon={faChevronDown} size="xs" />}
                  />
                  <Select.Options>
                    <Select.Option
                      value="test"
                      label="discussion 1"
                      selectedIcon={<FontAwesomeIcon icon={faCheck} />}
                    />
                  </Select.Options>
                </Select>
                <IconButton
                  icon={
                    <FontAwesomeIcon icon={faEye} className="text-gray-500" />
                  }
                  aria-label="Show discussion details"
                  size="md"
                />
                <IconButton
                  icon={
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-blue-500"
                    />
                  }
                  aria-label="Show help"
                  size="md"
                />
              </div>
            </div>
            <Messages discussionId={data?.discussionById.id} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Discussion;
