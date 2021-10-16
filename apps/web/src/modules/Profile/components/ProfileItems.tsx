import { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';
import { Link } from '@spout/toolkit';
import { generateId } from './../../../shared/utils/generateId';

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
        scheme="gray"
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
              'relative w-12 h-12 rounded-full',
              variants[colour]
            )}
          >
            <span className="absolute inset-0 inline-flex items-center justify-center">
              {icon}
            </span>
          </div>
        </div>
        <div className="flex-1 ml-3">
          <div>
            <span
              id={titleId}
              className="font-bold text-md text-gray-900 sm:text-xl"
            >
              {title}
            </span>
          </div>
          <p id={descId} className="font-medium text-sm text-gray-500">
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
