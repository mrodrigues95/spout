import { ComponentPropsWithRef, forwardRef } from 'react';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import clsx from 'clsx';

const STYLES = {
  base: 'relative inline-flex items-center justify-center tracking-wide select-none text-left font-semibold outline-none rounded-md transition duration-150 ease-in-out',
  active:
    'focus:outline-none focus:ring focus:ring-offset-white focus:ring-offset-2',
  disabled: 'disabled:opacity-60 disabled:pointer-events-none',
  size: {
    regular: {
      xs: 'py-1 px-2 text-xs',
      sm: 'py-2 px-4 text-sm',
      md: 'py-2 px-6 text-md',
      lg: 'py-3 px-8 text-lg',
      xl: 'py-4 px-10 text-xl',
    },
    icon: {
      xs: 'p-1 text-xs',
      sm: 'p-2 text-sm',
      md: 'p-3 text-md',
      lg: 'p-6 text-lg',
      xl: 'p-8 text-xl',
    },
  },
  variant: {
    solid: 'border-none',
    light: 'border-none',
    outline: 'border-2 border-current bg-white',
    ghost: 'border-none bg-transparent',
    link: 'border-none !p-0 focus:underline hover:underline',
    unstyled: '',
  },
  scheme: {
    gray: {
      solid: 'text-white bg-gray-900 focus:ring hover:bg-gray-700',
      light:
        'text-gray-700 bg-gray-100 focus:bg-gray-200 focus:ring focus:text-gray-900 hover:text-gray-900 hover:bg-gray-200',
      ghost:
        'text-gray-700 focus:bg-gray-100 focus:ring focus:text-gray-900 hover:text-gray-900 hover:bg-gray-100',
      outline: 'text-gray-900 focus:bg-gray-200 focus:ring hover:bg-gray-100',
      link: 'text-gray-900 bg-white ring-transparent',
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
    orange: {
      solid:
        'text-white bg-orange-600 focus:ring-orange-600 hover:bg-orange-700',
      light:
        'text-orange-600 bg-orange-100 focus:ring-orange-600 hover:bg-orange-200',
      ghost:
        'text-orange-600 focus:bg-orange-100 focus:ring-orange-600 hover:bg-orange-100',
      outline:
        'text-orange-600 focus:bg-orange-100 focus:ring-orange-600 hover:bg-orange-100',
      link: 'text-orange-600 bg-white focus:ring-orange-600',
    },
    sky: {
      solid: 'text-white bg-sky-600 focus:ring-sky-600 hover:bg-sky-700',
      light: 'text-sky-600 bg-sky-100 focus:ring-sky-600 hover:bg-sky-200',
      ghost:
        'text-sky-600 focus:bg-sky-100 focus:ring-sky-600 hover:bg-sky-100',
      outline:
        'text-sky-600 focus:bg-sky-100 focus:ring-sky-600 hover:bg-sky-100',
      link: 'text-sky-600 bg-white focus:ring-sky-600',
    },
  },
} as const;

export const buttonOrLinkStyles = { ...STYLES };

export interface Styles {
  size?: keyof typeof STYLES['size']['icon'];
  variant?: keyof typeof STYLES['variant'];
  scheme?: keyof typeof STYLES['scheme'];
  fullWidth?: boolean;
  isIcon?: boolean;
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
      variant = 'solid',
      scheme = 'gray',
      fullWidth = false,
      isIcon = false,
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
            STYLES.variant[variant],
            STYLES.scheme[scheme][variant],
            isIcon ? STYLES.size['icon'][size] : STYLES.size['regular'][size],
            fullWidth && 'w-full',
          );

    const content = (
      <ButtonOrLink
        ref={ref}
        className={twMerge(classes, className)}
        {...props}
      />
    );

    if (isLink) {
      const finalHref =
        preserveRedirect && router.query.redirect
          ? `${href!}?redirect=${encodeURIComponent(
              router.query.redirect as string,
            )}`
          : href!;

      return (
        <Link href={finalHref} passHref>
          {content}
        </Link>
      );
    }

    return content;
  },
);
