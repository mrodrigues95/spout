import { ComponentProps, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import clsx from 'clsx';

const STYLES = {
  size: {
    xs: 'w-4 h-4 text-[0.4rem]',
    sm: 'w-6 h-6 text-[0.6rem]',
    md: 'w-8 h-8 text-[0.8rem]',
    lg: 'w-12 h-12 text-[1.2rem]',
    xl: 'w-16 h-16 text-[1.6rem]',
    xxl: 'w-24 h-24 text-[2.4rem]',
  },
  scheme: {
    sky: 'bg-sky-100 text-sky-600',
    pink: 'bg-pink-100 text-pink-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    rose: 'bg-rose-100 text-rose-600',
    gray: 'bg-gray-100 text-gray-600',
    orange: 'bg-orange-100 text-orange-600',
  },
} as const;

interface BaseAvatarProps {
  src?: string | null;
  name?: string;
}

const AvatarPlaceholderIcon = () => {
  return <FontAwesomeIcon icon={faUser} />;
};

const getInitials = (name: string) => {
  const initials = name.split(' ').map((n) => n[0]);
  return initials.join('');
};

interface AvatarNameProps
  extends ComponentProps<'div'>,
    Pick<BaseAvatarProps, 'name'> {}

const AvatarName = ({ name, ...props }: AvatarNameProps) => {
  return (
    <div role="img" aria-label={name} {...props}>
      {name ? getInitials(name) : null}
    </div>
  );
};

export interface AvatarProps extends ComponentProps<'span'>, BaseAvatarProps {
  isNextJs?: boolean;
  rounded?: boolean;
  size?: keyof typeof STYLES['size'];
  scheme?: keyof typeof STYLES['scheme'];
}

export const Avatar = ({
  src,
  name,
  className,
  isNextJs = true,
  rounded = false,
  size = 'md',
  scheme = 'gray',
  ...props
}: AvatarProps) => {
  const [error, setError] = useState(!src);

  useEffect(() => {
    !src ? setError(true) : setError(false);
  }, [src]);

  const ErrorFallbackComponent = name ? (
    <AvatarName name={name} />
  ) : (
    <AvatarPlaceholderIcon />
  );

  const imgProps = {
    src: src as string | undefined,
    alt: name,
    className: rounded ? 'rounded-full' : 'rounded-md',
    onError: () => setError(true),
  };

  const ImageComponent = isNextJs ? (
    <Image objectFit="cover" layout="fill" {...imgProps} />
  ) : (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...imgProps} />
  );

  return (
    <span
      className={clsx(
        'relative inline-flex flex-shrink-0 items-center justify-center border-transparent text-center font-semibold uppercase',
        rounded ? 'rounded-full' : 'rounded-md',
        STYLES.size[size],
        STYLES.scheme[scheme],
        className,
      )}
      {...props}
    >
      {error ? ErrorFallbackComponent : ImageComponent}
    </span>
  );
};
