import { ComponentPropsWithRef, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const styles = {
  base:
    'relative inline-flex items-center justify-center tracking-wide select-none font-semibold outline-none transition duration-150 ease-in-out focus:outline-none focus:ring-offset-2 focus:ring-offset-white',
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
    outline: 'border border-current bg-transparent',
    ghost: 'border-none bg-transparent',
    unstyled: '',
  },
  scheme: {
    dark: {
      inactive: 'text-white bg-gray-900',
      active: 'hover:bg-gray-700 focus:ring focus:ring-gray-900',
    },
    gray: {
      inactive: 'text-gray-900 bg-gray-100',
      active: 'hover:bg-gray-200 focus:ring focus:ring-gray-900',
    },
    purple: {
      inactive: 'text-purple-600 bg-purple-100',
      active: 'hover:bg-purple-200 focus:ring focus:ring-purple-600',
    },
  },
};

export interface Styles {
  size?: keyof typeof styles['size'];
  rounded?: keyof typeof styles['rounded'];
  variant?: keyof typeof styles['variant'];
  scheme?: keyof typeof styles['scheme'];
  active?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export type ButtonOrLinkProps = ComponentPropsWithRef<'button'> &
  ComponentPropsWithRef<'a'> &
  Styles;

export interface Props extends ButtonOrLinkProps {
  preserveRedirect?: boolean;
}

export const ButtonOrLink = forwardRef<
  HTMLButtonElement & HTMLAnchorElement,
  Props
>(({ href, preserveRedirect, ...props }, ref) => {
  const router = useRouter();
  const isLink = typeof href !== 'undefined';
  const ButtonOrLink = isLink ? 'a' : 'button';

  const content = <ButtonOrLink ref={ref} {...props} />;

  if (isLink) {
    const finalHref =
      preserveRedirect && router.query.redirect
        ? `${href!}?redirect=${encodeURIComponent(
            router.query.redirect as string
          )}`
        : href!;

    return <Link href={finalHref}>{content}</Link>;
  }

  return content;
});
