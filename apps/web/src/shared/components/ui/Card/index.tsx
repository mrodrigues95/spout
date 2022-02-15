import { ElementType } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Card as SCard, CardProps } from '@spout/toolkit';

const Card = <T extends ElementType = 'div'>({
  className,
  ...props
}: CardProps<T>) => {
  return (
    <SCard
      className={twMerge(clsx('rounded-2xl bg-white p-2', className))}
      {...props}
    />
  );
};

export default Card;
