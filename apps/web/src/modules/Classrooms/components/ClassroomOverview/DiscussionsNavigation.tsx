import { ComponentProps } from 'react';
import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HorizontalNavigation, Button, Link, Tooltip } from '@spout/toolkit';
import clsx from 'clsx';
import { DiscussionsNavigation_discussions$key } from './__generated__/DiscussionsNavigation_discussions.graphql';

const HorizontalNavigationSeparator = () => {
  return <span className="ml-2 -mr-2 border border-gray-400 opacity-50 h-5" />;
};

interface HorziontalNavigationItemProps extends ComponentProps<'li'> {}

const HorziontalNavigationItem = ({
  className,
  children,
}: HorziontalNavigationItemProps) => {
  return (
    <li
      className={clsx(
        'inline-flex items-center justify-center h-full w-16',
        className
      )}
    >
      {children}
    </li>
  );
};

const fragment = graphql`
  fragment DiscussionsNavigation_discussions on Classroom {
    id
    discussions {
      id
      name
    }
  }
`;

interface Props {
  classroom: DiscussionsNavigation_discussions$key;
}

const DiscussionsNavigation = ({ classroom }: Props) => {
  const data = useFragment(fragment, classroom);

  return (
    <HorizontalNavigation as="nav" className="py-2" hideScroll>
      <ul className="flex items-center justify-center px-1.5 space-x-2">
        <HorziontalNavigationItem className="mr-2">
          <Tooltip label="Create Discussion">
            <Button
              className="flex-1 h-full p-4 bg-indigo-400 text-white select-none outline-none rounded-100 transition-all duration-150 ease-in-out hover:rounded-2xl focus:ring focus:ring-offset-2 focus:ring-offset-white focus:rounded-2xl"
              variant="unstyled"
            >
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          </Tooltip>
          <HorizontalNavigationSeparator />
        </HorziontalNavigationItem>
        {data.discussions.map((discussion) => (
          <HorziontalNavigationItem key={discussion.id}>
            <Tooltip label={discussion.name}>
              <Link
                key={discussion.id}
                href={`/classrooms/${data.id}/${discussion.id}`}
                className="flex-1 h-full p-4 bg-indigo-400 text-white select-none outline-none rounded-100 transition-all duration-150 ease-in-out hover:rounded-2xl focus:ring focus:ring-offset-2 focus:ring-offset-white focus:rounded-2xl"
                variant="unstyled"
                onMouseDown={(e) => e.preventDefault()}
              >
                test
              </Link>
            </Tooltip>
          </HorziontalNavigationItem>
        ))}
      </ul>
    </HorizontalNavigation>
  );
};

export default DiscussionsNavigation;
