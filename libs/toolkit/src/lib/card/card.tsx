import { ElementType, forwardRef, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { PolymorphicComponentPropsWithRef, PolymorphicRef } from '../../types';

export type CardProps<T extends ElementType = 'div'> =
  PolymorphicComponentPropsWithRef<T>;

type CardComponent = <T extends ElementType = 'div'>(
  props: CardProps<T>,
) => ReactElement | null;

export const Card: CardComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { as, className, ...props }: CardProps<T>,
    ref?: PolymorphicRef<T>,
  ) => {
    const Component = as || 'div';

    return (
      <Component
        {...props}
        className={twMerge(
          clsx(
            'relative rounded-lg bg-white p-4 shadow-sm ring-2 ring-gray-900/5',
            className,
          ),
        )}
        ref={ref}
      />
    );
  },
);
