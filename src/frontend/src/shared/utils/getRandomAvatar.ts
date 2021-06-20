type AvatarUrl = string;

const randomAvatarUrls: AvatarUrl[] = [
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532718/user_default_avatars/Multiavatar-dsdsd234512hjn31988888_u2ebge.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-7f71eca9e02dad83b4_bp25hg.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-860de157d02efa3133_f3eebh.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-aa4e93b755afcb23f4_tnsepl.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-7bcf9aa37256f60a31_f0gwrk.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-77cd3f4e2a56337b7b_gwh1uv.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614532716/user_default_avatars/Multiavatar-94a73b4a881c6461c2_pfrpeq.svg',
  'https://res.cloudinary.com/dxai9czyv/image/upload/v1614527675/user_default_avatars/Multiavatar-Victor_Montoya_ppq7lu.svg',
];

/**
 * Returns a random avatar that is to be used as the users profile photo.
 *
 * If for whatever reason the users profile photo cannot be fetched from
 * Cloudinary, this can be used to display a random avatar instead.
 * @return {string} The image URL pointing to a random avatar stored in Cloudinary.
 */
export const getRandomAvatar = () =>
  randomAvatarUrls[Math.floor(Math.random() * randomAvatarUrls.length)];
