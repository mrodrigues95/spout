import { gql, useQuery } from '@apollo/client';
import {
  NotificationsIcon,
  ProfileIcon,
  LockIcon,
  ColorSwatchIcon,
} from '@spout/assets/icons/outline';
import { FeelingBlueIllustration } from '@spout/assets/illustrations';
import { Spinner } from '@spout/toolkit';
import { Layout, Container, ErrorFallback } from '../../../shared/components';
import { UserInfoFragment } from '../../../modules/Discussion/utils/fragments';
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
      <Container>
        <Container.Header title="Profile" />
        <Container.Body className="container flex flex-col mx-auto mt-2 w-full p-2 sm:p-0">
          <>
            {loading && <Spinner size="xl" center className="flex-1" />}
            {error && (
              <ErrorFallback
                icon={<FeelingBlueIllustration className="w-full h-64" />}
                heading="Sorry, we can't load your profile right now."
                action={refetch}
              />
            )}
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
                      icon={
                        <NotificationsIcon className="w-6 h-6 text-white" />
                      }
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
          </>
        </Container.Body>
      </Container>
    </Layout>
  );
};

export default Profile;
