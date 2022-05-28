import { graphql, useFragment } from 'react-relay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Text } from '@spout/toolkit';
import { Avatar } from '../../../../shared/components';
import { getRandomColor } from '../../../../shared/utils';
import { Header_classroom$key } from './__generated__/Header_classroom.graphql';

const fragment = graphql`
  fragment Header_classroom on Classroom {
    name
    createdBy {
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
        <Text weight="semibold" size="lg">
          {classroom.name}
        </Text>
      </div>
      <div className="space-x-3">
        <Text as="span">
          <FontAwesomeIcon icon={faUser} className="mr-1" />
          {classroom.users!.totalCount} participants
        </Text>
        {classroom.discussions!.totalCount > 0 && (
          <>
            <span>&bull;</span>
            <Text as="span">
              <FontAwesomeIcon icon={faComments} className="mr-1" />
              {classroom.discussions!.totalCount} discussions
            </Text>
          </>
        )}
      </div>
      <div className="flex items-center">
        <Text as="span" className="mr-2">
          Instructed by
        </Text>
        <Avatar
          src={classroom.createdBy.avatarUrl}
          name={classroom.createdBy.name}
          profileColor={classroom.createdBy.profileColor}
          containerProps={{ className: 'shadow-sm mr-1.5' }}
          size="sm"
        />
        <Text as="span" weight="medium">
          {classroom.createdBy.name}
        </Text>
      </div>
    </article>
  );
};

export default Header;
