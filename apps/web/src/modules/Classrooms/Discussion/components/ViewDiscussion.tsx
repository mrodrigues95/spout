import { graphql, useLazyLoadQuery } from 'react-relay';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { Card } from '../../../../shared/components';
import DiscussionHeader from './DiscussionHeader';
import DiscussionDetails from './DiscussionDetails';
import DiscussionMessagesList from './DiscussionMessages/DiscussionMessagesList';
import DiscussionMessageComposer from './DiscussionMessages/DiscussionMessageComposer';
import { ViewDiscussionQuery } from './__generated__/ViewDiscussionQuery.graphql';

export const query = graphql`
  query ViewDiscussionQuery($id: ID!, $count: Int!, $cursor: String) {
    discussionById(id: $id) {
      id
      name
      ...DiscussionHeader_discussion
      ...DiscussionDetails_discussion
      ...DiscussionMessagesList_discussion
        @arguments(count: $count, cursor: $cursor)
      ...DiscussionMessageComposer_discussion
    }
    me {
      ...DiscussionMessagesList_user
      ...DiscussionMessageComposer_user
    }
  }
`;

interface Props {
  fetchKey: number;
}

const ViewDiscussion = ({ fetchKey }: Props) => {
  const router = useRouter();
  const data = useLazyLoadQuery<ViewDiscussionQuery>(
    query,
    {
      id: router.query.discussionId as string,
      count: 50,
    },
    { fetchPolicy: 'store-and-network', fetchKey },
  );

  return (
    <>
      <NextSeo title={data.discussionById.name} />
      <section className="flex flex-1 flex-col space-y-4">
        <DiscussionHeader discussion={data.discussionById} />
        <article className="flex flex-1 flex-col space-y-3">
          <Card className="relative flex flex-1 flex-col rounded-xl bg-indigo-50/40 p-0">
            <div className="bg-messages absolute inset-0 h-full w-full opacity-[7%]" />
            <DiscussionMessagesList
              key={data.discussionById.id}
              discussion={data.discussionById}
              user={data.me!}
            />
          </Card>
          <Card className="p-0">
            <DiscussionMessageComposer
              discussion={data.discussionById}
              user={data.me!}
            />
          </Card>
        </article>
      </section>
      <DiscussionDetails discussion={data.discussionById} />
    </>
  );
};

export default ViewDiscussion;
