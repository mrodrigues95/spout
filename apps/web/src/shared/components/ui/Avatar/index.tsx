import {
  Avatar as SPAvatar,
  AvatarProps as SPAvatarProps,
} from '@spout/toolkit';
import { UserProfileColor } from '../../../../../src/__generated__/schema.generated';

interface Props extends SPAvatarProps {
  profileColor: UserProfileColor;
}

const Avatar = ({ profileColor, ...props }: Props) => {
  const scheme = profileColor.toLowerCase() as SPAvatarProps['scheme'];
  return <SPAvatar scheme={scheme} {...props} />;
};

export default Avatar;
