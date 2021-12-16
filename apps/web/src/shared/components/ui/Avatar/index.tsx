import { ComponentProps } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

const sizes = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  xxl: 'w-20 h-20',
};

interface Props extends ComponentProps<'span'> {
  src: string;
  name?: string;
  size?: keyof typeof sizes;
}

// TODO: Handle errors while attempting to load `src`.
// We should have a fallback avatar or use initials.
const Avatar = ({ src, name, size = 'md', className, ...props }: Props) => {
  return (
    <span
      className={clsx(
        'relative inline-flex justify-center items-center flex-shrink-0 border-none',
        sizes[size],
        className,
      )}
      {...props}
    >
      <Image
        src={src}
        className="relative rounded-md"
        alt={name ?? ''}
        role="img"
        objectFit="contain"
        layout="fill"
        sizes="50vw"
      />
    </span>
  );
};

export default Avatar;
