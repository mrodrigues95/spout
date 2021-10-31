import { ComponentProps, ReactNode } from 'react';
import clsx from 'clsx';

const styles = {
  size: {
    xs: 'px-1 text-xs',
    sm: 'px-2 text-sm',
    md: 'py-1 px-4 text-md',
  },
  scheme: {
    pink: 'bg-pink-100 text-pink-700',
    green: 'bg-green-100 text-green-700',
  },
};

export interface BadgeProps extends ComponentProps<'span'> {
  scheme: keyof typeof styles['scheme'];
  size?: keyof typeof styles['size'];
  pill?: boolean;
  children: ReactNode;
}

export const Badge = ({
  scheme,
  size = 'sm',
  pill = false,
  children,
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        'inline-flex leading-5 font-semibold uppercase',
        styles.scheme[scheme],
        styles.size[size],
        pill ? 'rounded-full' : 'rounded',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
