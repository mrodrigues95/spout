import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Text } from '@spout/toolkit';
import { Avatar } from '../../../../shared/components';
import { MEDIA_QUERIES, useMediaQuery } from '../../../../shared/hooks';
import { getRandomColor } from '../../../../shared/utils';
import { Header_classroom$key } from './__generated__/Header_classroom.graphql';

const fragment = graphql`
  fragment Header_classroom on Classroom {
    name
    teacher {
      name
      avatarUrl
      profileColor
    }
    discussions {
      totalCount
    }
    users {
      totalCount
    }
  }
`;

interface Props {
  classroom: Header_classroom$key;
}

const Header = ({ ...props }: Props) => {
  const classroom = useFragment(fragment, props.classroom);
  const color = getRandomColor();
  const isTablet = useMediaQuery(MEDIA_QUERIES.SMALL);

  return (
    <article className="flex flex-col items-center justify-center space-y-1.5 text-center">
      <div className="flex items-center space-x-2">
        <div
          className={clsx(
            'h-3 w-3 rounded-md border-2',
            color.bg,
            color.border,
          )}
          aria-hidden="true"
        />
        <Text weight="semibold" size={isTablet ? 'lg' : 'md'}>
          {classroom.name}
        </Text>
      </div>
      <div className="space-x-3">
        <Text as="span" size={isTablet ? 'md' : 'sm'}>
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          {classroom.users!.totalCount} participants
        </Text>
        {classroom.discussions!.totalCount > 0 && (
          <>
            <span>&bull;</span>
            <Text as="span" size={isTablet ? 'md' : 'sm'}>
              <FontAwesomeIcon icon={faComments} className="mr-1" />
              {classroom.discussions!.totalCount} discussions
            </Text>
          </>
        )}
      </div>
      <div className="flex items-center">
        <Text as="span" size={isTablet ? 'md' : 'sm'} className="mr-2">
          Instructed by
        </Text>
        <Avatar
          src={classroom.teacher.avatarUrl}
          name={classroom.teacher.name}
          profileColor={classroom.teacher.profileColor}
          containerProps={{ className: 'shadow-sm mr-1.5' }}
          size="sm"
        />
        <Text as="span" weight="medium" size={isTablet ? 'md' : 'sm'}>
          {classroom.teacher.name}
        </Text>
      </div>
    </article>
  );
};

export default Header;
