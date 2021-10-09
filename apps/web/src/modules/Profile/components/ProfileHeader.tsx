import { UserInfo_User } from '../../Discussion/utils/__generated__/fragments.generated';
import { Avatar } from '../../../shared/components';
import { getRandomAvatar } from '../../../shared/utils/getRandomAvatar';

interface Props {
  me: UserInfo_User;
}

const ProfileHeader = ({ me }: Props) => {
  return (
    <figure className="flex flex-col items-center justify-center">
      <Avatar
        src={getRandomAvatar()}
        name={me.name}
        className="h-16 w-16 sm:h-20 sm:w-20 md:w-32 md:h-32 lg:h-48 lg:w-48"
      />
      <figcaption className="mt-5 font-bold text-xl sm:text-2xl">
        {me.name} 😀
      </figcaption>
      <span className="text-gray-500 font-semibold">{me.email}</span>
    </figure>
  );
};

export default ProfileHeader;
