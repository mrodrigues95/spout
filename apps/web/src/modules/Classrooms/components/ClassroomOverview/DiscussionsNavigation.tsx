import { ComponentProps } from 'react';
import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HorizontalNavigation, Button, Link, Tooltip } from '@spout/toolkit';
import clsx from 'clsx';
import { DiscussionsNavigation_discussions$key } from '../../../../__generated__/DiscussionsNavigation_discussions.graphql';

const HorizontalNavigationSeparator = () => {
  return <span className="ml-2 -mr-2 h-5 border border-gray-400 opacity-50" />;
};

interface HorziontalNavigationItemProps extends ComponentProps<'li'> {}

const HorziontalNavigationItem = ({
  className,
  children,
}: HorziontalNavigationItemProps) => {
  return (
    <li
      className={clsx(
        'inline-flex h-full w-16 items-center justify-center',
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
      <ul className="flex items-center justify-center space-x-2 px-1.5">
        <HorziontalNavigationItem className="mr-2">
          <Tooltip label="Create Discussion">
            <Button
              className="outline-none h-full flex-1 select-none rounded-100 bg-indigo-400 p-4 text-white transition-all duration-150 ease-in-out hover:rounded-2xl focus:rounded-2xl focus:ring focus:ring-offset-2 focus:ring-offset-white"
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
                className="outline-none h-full flex-1 select-none rounded-100 bg-indigo-400 p-4 text-white transition-all duration-150 ease-in-out hover:rounded-2xl focus:rounded-2xl focus:ring focus:ring-offset-2 focus:ring-offset-white"
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
