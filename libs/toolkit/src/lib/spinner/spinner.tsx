import { ComponentProps } from 'react';
import { LoadingIcon } from '@spout/assets/icons/outline';
import clsx from 'clsx';

const styles = {
  size: {
    xs: 'h-4 w-4',
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-7 w-7',
    xl: 'h-8 w-8',
  },
  scheme: {
    black: 'text-black',
    white: 'text-white',
  },
};

export interface SpinnerProps extends ComponentProps<'div'> {
  size?: keyof typeof styles['size'];
  scheme?: keyof typeof styles['scheme'];
  srLabel?: string;
  center?: boolean;
}

export const Spinner = ({
  size = 'md',
  scheme = 'black',
  srLabel = 'Loading...',
  center = false,
  className,
  ...props
}: SpinnerProps) => {
  return (
    <div
      className={clsx(
        'flex items-center',
        center && 'justify-center',
        className,
      )}
      role="status"
      {...props}
    >
      <LoadingIcon
        className={clsx(
          'animate-spin',
          styles.size[size],
          styles.scheme[scheme],
        )}
      />
      <span className="sr-only">{srLabel}</span>
    </div>
  );
};
