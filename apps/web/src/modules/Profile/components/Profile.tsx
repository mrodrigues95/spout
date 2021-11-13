import { gql, useQuery } from '@apollo/client';
import {
  NotificationsIcon,
  ProfileIcon,
  LockIcon,
  ColorSwatchIcon,
} from '@spout/assets/icons/outline';
import { Layout, Container } from '../../../shared/components';
import { UserInfoFragment } from '../../Classrooms/Discussion/utils/fragments';
import { MeQuery } from './__generated__/Profile.generated';
import ProfileHeader from './ProfileHeader';
import ProfileItems from './ProfileItems';

const Profile = () => {
  const { data, loading, error, refetch } = useQuery<MeQuery>(
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
    <Layout title="Profile">
      <Container isLoading={loading} isError={error} refetch={refetch}>
        {data && (
          <>
            <ProfileHeader me={data.me!} />
            <div className="mt-8">
              <h2 className="font-bold mb-3 text-xl text-gray-900 sm:text-3xl">
                Settings ⚙️
              </h2>
              <ProfileItems>
                <ProfileItems.Item
                  to="about"
                  icon={<ProfileIcon className="w-6 h-6 text-white" />}
                  colour="salmon"
                  title="About"
                  description="Let others know a little bit about yourself."
                />
                <ProfileItems.Item
                  to="notifications"
                  icon={<NotificationsIcon className="w-6 h-6 text-white" />}
                  colour="blue"
                  title="Notifications"
                  description="Manage the way we send you all of the notifications and alerts."
                />
                <ProfileItems.Item
                  to="privacy"
                  icon={<LockIcon className="w-6 h-6" />}
                  colour="yellow"
                  title="Privacy"
                  description="Control who can view your information."
                />
                <ProfileItems.Item
                  to="appearance"
                  icon={<ColorSwatchIcon className="w-6 h-6 text-white" />}
                  colour="black"
                  title="Appearance"
                  description="Choose how Spout looks to you."
                />
              </ProfileItems>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Profile;
