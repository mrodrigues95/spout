import { ComponentPropsWithRef, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const STYLES = {
  base: 'relative inline-flex items-center justify-center tracking-wide select-none font-semibold outline-none transition duration-150 ease-in-out',
  active:
    'focus:outline-none focus:ring focus:ring-offset-2 focus:ring-offset-white',
  disabled: 'disabled:opacity-60 disabled:pointer-events-none',
  size: {
    xs: 'py-1 px-2 text-xs',
    sm: 'py-2 px-4 text-sm',
    md: 'py-2 px-6 text-md',
    lg: 'py-3 px-8 text-lg',
    xl: 'py-4 px-10 text-xl',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    normal: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    xxl: 'rounded-2xl',
    xxxl: 'rounded-3xl',
    full: 'rounded-full',
  },
  variant: {
    solid: 'border-none',
    light: 'border-none',
    outline: 'border-2 border-current bg-white',
    ghost: 'border-none bg-transparent',
    link: 'border-none !p-0 hover:underline',
    unstyled: '',
  },
  scheme: {
    dark: {
      solid: 'text-white bg-gray-900 focus:ring-gray-900 hover:bg-gray-700',
      light: 'text-gray-900 bg-gray-100 focus:ring-gray-900 hover:bg-gray-200',
      ghost:
        'text-gray-900 focus:bg-gray-100 focus:ring-gray-900 hover:bg-gray-100',
      outline:
        'text-gray-900 focus:bg-gray-100 focus:ring-gray-900 hover:bg-gray-100',
      link: 'text-gray-900 bg-white focus:ring-gray-900',
    },
    purple: {
      solid:
        'text-white bg-purple-600 focus:ring-purple-600 hover:bg-purple-700',
      light:
        'text-purple-600 bg-purple-100 focus:ring-purple-600 hover:bg-purple-200',
      ghost:
        'text-purple-600 focus:bg-purple-100 focus:ring-purple-600 hover:bg-purple-100',
      outline:
        'text-purple-600 focus:bg-purple-100 focus:ring-purple-600 hover:bg-purple-100',
      link: 'text-purple-600 bg-white focus:ring-purple-600',
    },
    red: {
      solid: 'text-white bg-red-600 focus:ring-red-600 hover:bg-red-700',
      light: 'text-red-600 bg-red-100 focus:ring-red-600 hover:bg-red-200',
      ghost:
        'text-red-600 focus:bg-red-100 focus:ring-red-600 hover:bg-red-100',
      outline:
        'text-red-600 focus:bg-red-100 focus:ring-red-600 hover:bg-red-100',
      link: 'text-red-600 bg-white focus:ring-red-600',
    },
  },
} as const;

export interface Styles {
  size?: keyof typeof STYLES['size'];
  rounded?: keyof typeof STYLES['rounded'];
  variant?: keyof typeof STYLES['variant'];
  scheme?: keyof typeof STYLES['scheme'];
  fullWidth?: boolean;
}

export type ButtonOrLinkProps = {
  preserveRedirect?: boolean;
} & ComponentPropsWithRef<'button'> &
  ComponentPropsWithRef<'a'> &
  Styles;

export const ButtonOrLink = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  ButtonOrLinkProps
>(
  (
    {
      href,
      preserveRedirect,
      size = 'md',
      rounded = 'md',
      variant = 'solid',
      scheme = 'dark',
      fullWidth = false,
      className,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const isLink = typeof href !== 'undefined';
    const ButtonOrLink = isLink ? 'a' : 'button';

    const classes =
      variant === 'unstyled'
        ? className
        : clsx(
            STYLES.base,
            STYLES.disabled,
            STYLES.active,
            STYLES.size[size],
            STYLES.rounded[rounded],
            STYLES.variant[variant],
            STYLES.scheme[scheme][variant],
            fullWidth && 'w-full',
            className,
          );

    const content = <ButtonOrLink ref={ref} className={classes} {...props} />;

    if (isLink) {
      const finalHref =
        preserveRedirect && router.query.redirect
          ? `${href!}?redirect=${encodeURIComponent(
              router.query.redirect as string,
            )}`
          : href!;

      return <Link href={finalHref}>{content}</Link>;
    }

    return content;
  },
);
