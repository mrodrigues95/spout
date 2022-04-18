import { graphql, usePaginationFragment } from 'react-relay';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import {
  Button,
  HorizontalNavigation,
  getHorizontalNavigationItemStyles,
  Tooltip,
} from '@spout/toolkit';
import { useConnection } from '../../../../shared/hooks';
import { DiscussionsMenu_discussions$key } from './__generated__/DiscussionsMenu_discussions.graphql';

const fragment = graphql`
  fragment DiscussionsMenu_discussions on Classroom
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 50 }
    cursor: { type: "String" }
  )
  @refetchable(queryName: "DiscussionsMenuListPaginationQuery") {
    id
    discussions(first: $count, after: $cursor)
      @connection(key: "DiscussionsMenu_classroom_discussions") {
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

  const styles = getHorizontalNavigationItemStyles();

  return (
    <div className="flex items-center ">
      <Tooltip label="Create Discussion">
        <Button
          className={clsx(styles.base, styles.active)}
          variant="unstyled"
          onClick={() => console.log('clicked')}
          aria-label="Create discussion"
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Tooltip>
      <HorizontalNavigation
        onChange={(idx) => {
          // TODO: Find a workaround for selecting the first discussion
          // via keyboard navigation.
          // HeadlessUI doesn't call `onChange` when the currently
          // selected `Tab` is selected again and they override most of the
          // event handlers (onClick, etc.) so there is no way to listen to
          // events. This means selecting the first discussion via keyboard
          // will not do anything.
          const discussion = discussions[idx];
          router.push(
            `/classrooms/${classroom.id}/discussions/${discussion.id}`,
          );
        }}
      >
        <HorizontalNavigation.Divider />
        {discussions.map((discussion) => (
          <Tooltip key={discussion.id} label={discussion.name}>
            <div>
              <HorizontalNavigation.Item
                aria-label={`Go to ${discussion.name}`}
                href={`/classrooms/${classroom.id}/discussions/${discussion.id}`}
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
