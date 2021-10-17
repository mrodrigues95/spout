import { ElementType, ComponentProps } from 'react';

interface Props<T extends ElementType> {
  as?: T;
}

export type CardProps<T extends ElementType = 'div'> = Props<T> &
  Omit<ComponentProps<T>, keyof Props<T>>;

export const Card = <T extends ElementType = 'div'>({
  as,
  ...props
}: CardProps<T>) => {
  const Component = as || 'div';

  return <Component {...props} />;
};
