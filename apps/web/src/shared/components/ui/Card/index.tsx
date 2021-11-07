import { ElementType } from 'react';
import { Card as SCard, CardProps } from '@spout/toolkit';
import clsx from 'clsx';

const Card = <T extends ElementType = 'div'>({
  className,
  ...props
}: CardProps<T>) => {
  return <SCard className={clsx('p-4 bg-white rounded-md', className)} {...props} />;
};

export default Card;
