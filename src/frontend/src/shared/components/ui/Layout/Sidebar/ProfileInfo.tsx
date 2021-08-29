import { ChevronIcon } from '~/shared/assets';
import { Avatar, Link } from '~/shared/components';
import { getRandomAvatar } from '~/shared/utils/getRandomAvatar';

const ProfileInfo = () => {
  return (
    <div className="flex items-center justify-center">
      <Avatar
        url={getRandomAvatar()}
        containerClassName="xl:mr-3 h-12 w-12"
        rounded
      />
      <div className="hidden w-full xl:flex items-center justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-black">Marcus Rodrigues</p>
          <p className="text-xs text-gray-400 font-medium truncate">
            mrodrigues@spout.com
          </p>
        </div>
        <Link
          href="/profile"
          aria-label="Go to profile"
          rounded="full"
          variant="ghost"
          scheme="light"
          className="!p-3"
        >
          <ChevronIcon className="transform rotate-180 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
