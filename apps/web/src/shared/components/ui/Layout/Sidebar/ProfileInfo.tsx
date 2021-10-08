import { gql, useQuery } from '@apollo/client';
import { UserInfoFragment } from '../../../../../modules/Discussion/utils/fragments';
import { ChevronIcon } from '@spout/assets/icons/outline';
import { Link } from '@spout/toolkit';
import Avatar from '../../Avatar';
import { getRandomAvatar } from '../../../../../shared/utils/getRandomAvatar';
import { MeQuery } from './__generated__/ProfileInfo.generated';

const ProfileInfo = () => {
  const { data } = useQuery<MeQuery>(
    gql`
      query MeQuery {
        me {
          ...UserInfo_user
        }
      }
      ${UserInfoFragment}
    `
  );

  return (
    <div className="flex items-center justify-center">
      <Avatar url={getRandomAvatar()} containerClassName="xl:mr-3" rounded />
      <div className="hidden w-full xl:flex items-center justify-between">
        <div className="flex flex-col min-w-0 mr-3">
          <p className="font-bold text-black truncate">{data?.me?.name}</p>
          <p className="text-xs text-gray-400 font-medium truncate">
            {data?.me?.email}
          </p>
        </div>
        <Link
          href="/profile"
          aria-label="Go to profile"
          rounded="full"
          scheme="gray"
          variant="ghost"
          className="!p-2"
        >
          <ChevronIcon className="transform rotate-180 h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
