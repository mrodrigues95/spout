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
      className={twMerge(clsx('p-2 bg-white rounded-2xl', className))}
      {...props}
    />
  );
};

export default Card;
