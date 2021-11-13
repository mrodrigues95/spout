import { ComponentProps } from 'react';
import clsx from 'clsx';
import { LoadingIcon } from '@spout/assets/icons/outline';
import { LoadingBricks } from './loading-bricks';

const styles = {
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
    circle: LoadingIcon,
    bricks: LoadingBricks,
  },
};

export interface SpinnerProps extends ComponentProps<'div'> {
  size?: keyof typeof styles['size'];
  scheme?: keyof typeof styles['scheme'];
  variant?: keyof typeof styles['variant'];
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
  const Spinner = styles.variant[variant];

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
          styles.size[size],
          styles.scheme[scheme]
        )}
      />
      <span className="sr-only">{srLabel}</span>
    </div>
  );
};
