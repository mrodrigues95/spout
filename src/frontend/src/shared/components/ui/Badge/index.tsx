import { ReactNode } from 'react';
import clsx from 'clsx';

export enum BadgeVariants {
  PINK = 'bg-pink-100 text-pink-700',
  GREEN = 'bg-green-100 text-green-700',
}

interface Props {
  variant: BadgeVariants;
  children: ReactNode;
}

const Badge = ({ variant, children }: Props) => {
  return (
    <span
      className={clsx(
        'px-2 py-1 inline-flex leading-5 font-semibold rounded-full',
        variant
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
