import { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import { Link, generateId } from '@spout/toolkit';

const variants = {
  yellow: 'bg-yellow-400',
  blue: 'bg-blue-400',
  salmon: 'bg-red-400',
  black: 'bg-black',
};

interface ProfileItemProps {
  to: string;
  icon: ReactElement;
  colour: keyof typeof variants;
  title: string;
  description: string;
}

// TODO: Rename this to `ProfileNavigation`.
const ProfileItem = ({
  to,
  icon,
  title,
  colour,
  description,
}: ProfileItemProps) => {
  const titleId = `spout-profile-item-title-${generateId()}`;
  const descId = `spout-profile-item-desc-${generateId()}`;

  return (
    <li>
      <Link
        href={to}
        variant="ghost"
        rounded="xxl"
        className="!p-4"
        fullWidth
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div className="inline-flex items-center justify-center">
          <div
            className={clsx(
              'relative h-12 w-12 rounded-full',
              variants[colour],
            )}
          >
            <span className="absolute inset-0 inline-flex items-center justify-center">
              {icon}
            </span>
          </div>
        </div>
        <div className="ml-3 flex-1">
          <div>
            <span
              id={titleId}
              className="text-md font-bold text-gray-900 sm:text-xl"
            >
              {title}
            </span>
          </div>
          <p id={descId} className="text-sm font-medium text-gray-500">
            {description}
          </p>
        </div>
      </Link>
    </li>
  );
};

interface ProfileItemsProps extends ComponentProps<'ul'> {}

const ProfileItems = ({ children, ...props }: ProfileItemsProps) => {
  return (
    <ul className="flex flex-col justify-center space-y-4" {...props}>
      {children}
    </ul>
  );
};

ProfileItems.Item = ProfileItem;

export default ProfileItems;
