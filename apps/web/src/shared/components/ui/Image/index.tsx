import { ReactNode, useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

const SIZES = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
  xxl: 'w-24 h-24',
} as const;

interface BaseImageProps {
  rounded?: boolean;
  fallback?: ReactNode;
}

interface ImageFallbackProps extends BaseImageProps {}

const ImageFallback = ({ fallback, rounded }: ImageFallbackProps) => {
  return (
    <div
      className={clsx(
        'absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500',
        rounded ? 'rounded-full' : 'rounded-md',
      )}
    >
      {fallback ? fallback : <FontAwesomeIcon icon={faImage} />}
    </div>
  );
};

interface Props extends NextImageProps, BaseImageProps {
  size?: keyof typeof SIZES;
}

const Image = ({
  src,
  alt,
  fallback,
  objectFit = 'cover',
  layout = 'fill',
  rounded = false,
  size = 'md',
  sizes = '50vw',
  ...props
}: Props) => {
  const [error, setError] = useState(false);

  return (
    <figure>
      <div
        className={clsx(
          'relative',
          rounded ? 'rounded-full' : 'rounded-md',
          SIZES[size],
        )}
      >
        {error ? (
          <ImageFallback fallback={fallback} rounded={rounded} />
        ) : (
          <NextImage
            src={src}
            alt={alt}
            objectFit={objectFit}
            layout={layout}
            sizes={sizes}
            onError={() => setError(true)}
            {...props}
          />
        )}
      </div>
    </figure>
  );
};

export default Image;
