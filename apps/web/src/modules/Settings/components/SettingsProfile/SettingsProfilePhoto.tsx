import { graphql, useFragment } from 'react-relay';
import { Dropzone, Title } from '@spout/toolkit';
import { Avatar } from '../../../../shared/components';
import { SettingsProfilePhoto_user$key } from '../../../../__generated__/SettingsProfilePhoto_user.graphql';

const fragment = graphql`
  fragment SettingsProfilePhoto_user on User {
    name
    avatarUrl
    profileColor
  }
`;

interface Props {
  me: SettingsProfilePhoto_user$key;
}

const SettingsProfilePhoto = ({ ...props }: Props) => {
  const me = useFragment(fragment, props.me);

  // TODO: Implement this, also use a photo cropper.
  return (
    <div className="mt-5 space-y-6">
      <Title as="h2" variant="h5" className="font-medium">
        Your photo
      </Title>
      <div className="flex space-x-8">
        <Avatar
          name={me.name}
          src={me.avatarUrl}
          profileColor={me.profileColor}
          size="xxl"
          rounded
        />
        <Dropzone primaryMessage="Select a photo to upload" />
      </div>
    </div>
  );
};

export default SettingsProfilePhoto;
