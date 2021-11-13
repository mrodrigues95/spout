import { ComponentProps } from 'react';
import { HorizontalNavigation, Button, Link, Tooltip } from '@spout/toolkit';
import { PlusCircleIcon } from '@spout/assets/icons/outline';
import clsx from 'clsx';
import { Classroom_Classroom } from '../__generated__/ViewClassroom.generated';

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
        className,
      )}
    >
      {children}
    </li>
  );
};

interface Props {
  classroom: Classroom_Classroom;
}

const DiscussionsNavigation = ({ classroom }: Props) => {
  return (
    <HorizontalNavigation as="nav" className="py-2" hideScroll>
      <ul className="flex items-center justify-center px-1.5 space-x-2">
        <HorziontalNavigationItem className="mr-2">
          <Tooltip label="Create Discussion">
            <Button
              className="flex-1 h-full p-4 bg-indigo-400 text-white select-none outline-none rounded-100 transition-all duration-150 ease-in-out hover:rounded-2xl focus:ring focus:ring-offset-2 focus:ring-offset-white focus:rounded-2xl"
              variant="unstyled"
            >
              <PlusCircleIcon className="w-4 h-4 mx-auto" />
            </Button>
          </Tooltip>
          <HorizontalNavigationSeparator />
        </HorziontalNavigationItem>
        {classroom.discussions.map((discussion) => (
          <HorziontalNavigationItem key={discussion.id}>
            <Tooltip label={discussion.name}>
              <Link
                key={discussion.id}
                href={`/classrooms/${classroom.id}/${discussion.id}`}
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
