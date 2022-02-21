import { ComponentProps, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

const STYLES = {
  color: {
    dark: 'text-gray-900',
    body: 'text-gray-700',
    muted: 'text-gray-500',
  },
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
  },
  casing: {
    capitalize: 'capitalize',
    uppercase: 'uppercase',
    lowercase: 'lowercase',
    normalcase: 'normal-case',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  variant: {
    default: '',
    subtitle: 'text-sm font-semibold uppercase text-gray-700',
  },
} as const;

interface Props<T extends ElementType> {
  as?: T;
  color?: keyof typeof STYLES['color'];
  casing?: keyof typeof STYLES['casing'];
  size?: keyof typeof STYLES['size'];
  weight?: keyof typeof STYLES['weight'];
  variant?: keyof typeof STYLES['variant'];
  truncate?: boolean;
}

export type TextProps<T extends ElementType = any> = Props<T> &
  Omit<ComponentProps<T>, keyof Props<T>>;

export const Text = <T extends ElementType = 'p'>({
  as,
  className,
  color = 'body',
  casing = 'normalcase',
  size = 'md',
  weight = 'normal',
  variant = 'default',
  truncate = false,
  ...props
}: TextProps<T>) => {
  const Component = as || 'p';

  return (
    <Component
      className={twMerge(
        clsx(
          STYLES.size[size],
          STYLES.casing[casing],
          STYLES.color[color],
          STYLES.weight[weight],
          STYLES.variant[variant],
          truncate && 'truncate',
          className,
        ),
      )}
      {...props}
    />
  );
};
