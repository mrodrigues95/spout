import { ComponentProps } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { LoadingBricks } from './loading-bricks';

const Circle = () => <FontAwesomeIcon icon={faSpinner} />

const STYLES = {
  size: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  },
  scheme: {
    black: 'text-black',
    white: 'text-white',
    purple: 'text-purple-500',
  },
  variant: {
    circle: Circle,
    bricks: LoadingBricks,
  },
};

export interface SpinnerProps extends ComponentProps<'div'> {
  size?: keyof typeof STYLES['size'];
  scheme?: keyof typeof STYLES['scheme'];
  variant?: keyof typeof STYLES['variant'];
  srLabel?: string;
  center?: boolean;
}

export const Spinner = ({
  size = 'md',
  scheme = 'purple',
  variant = 'bricks',
  srLabel = 'Loading...',
  center = false,
  className,
  ...props
}: SpinnerProps) => {
  const Spinner = STYLES.variant[variant];

  return (
    <div
      className={clsx(
        'flex items-center',
        center && 'justify-center',
        className
      )}
      role="status"
      {...props}
    >
      <Spinner
        className={clsx(
          variant === 'circle' && 'animate-spin',
          STYLES.size[size],
          STYLES.scheme[scheme]
        )}
      />
      <span className="sr-only">{srLabel}</span>
    </div>
  );
};
