import { graphql, usePaginationFragment } from 'react-relay';
import { useRouter } from 'next/router';
import { HorizontalNavigation, Tooltip, Keys } from '@spout/toolkit';
import { useConnection } from '../../../../shared/hooks';
import { DiscussionsMenu_discussions$key } from './__generated__/DiscussionsMenu_discussions.graphql';
import CreateDiscussion from './CreateDiscussion';

const fragment = graphql`
  fragment DiscussionsMenu_discussions on Classroom
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "String" }
  )
  @refetchable(queryName: "DiscussionsMenuListPaginationQuery") {
    id
    ...CreateDiscussion_classroom
    discussions(first: $count, after: $cursor, order: { name: ASC })
      @connection(key: "DiscussionsMenu_discussions") {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

interface Props {
  classroom: DiscussionsMenu_discussions$key;
}

const DiscussionsMenu = ({ ...props }: Props) => {
  const router = useRouter();
  const { data: classroom } = usePaginationFragment(fragment, props.classroom);

  const discussions = useConnection(classroom.discussions);

  const navigateDiscussion = (discussionId: string) =>
    router.push(`/classrooms/${classroom.id}/discussions/${discussionId}`);

  return (
    <div className="flex items-center">
      <CreateDiscussion classroom={classroom} />
      <HorizontalNavigation
        key={classroom.id}
        onChange={(idx) => {
          const discussion = discussions[idx];
          navigateDiscussion(discussion.id);
        }}
      >
        <HorizontalNavigation.Divider />
        {discussions.map((discussion, idx) => (
          <Tooltip key={discussion.id} label={discussion.name}>
            <div>
              <HorizontalNavigation.Item
                aria-label={`Go to ${discussion.name}`}
                href={`/classrooms/${classroom.id}/discussions/${discussion.id}`}
                onKeyDown={(e) => {
                  const isFirstItem = idx === 0;
                  // The first item is selected by default and HeadlessUI doesn't
                  // call `onChange` again if the item is already selected so this
                  // listens for specific keyboard events and responds accordingly.
                  if (
                    isFirstItem &&
                    (e.key === Keys.Space || e.key === Keys.Enter)
                  ) {
                    navigateDiscussion(discussion.id);
                  }
                }}
              >
                {discussion.name.slice(0, 1)}
              </HorizontalNavigation.Item>
            </div>
          </Tooltip>
        ))}
      </HorizontalNavigation>
    </div>
  );
};

export default DiscussionsMenu;
