import { ComponentPropsWithRef, forwardRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const classes = {
  base:
    'relative inline-flex items-center justify-center tracking-wide select-none font-bold outline-none transition duration-150 ease-in-out focus:outline-none',
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
    outline: 'border border-current !bg-transparent',
    ghost: 'border-none !bg-transparent',
    solid: 'border-none',
    unstyled: '',
  },
  scheme: {
    dark: {
      inactive: 'text-white bg-gray-900',
      active: 'hover:!bg-gray-700 focus:ring focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white'
    },
    light: {
      inactive: 'text-gray-900 bg-white',
      active: 'hover:!bg-gray-100 focus:bg-gray-100 active:bg-gray-200'
    },
    purple: {
      inactive: 'text-purple-700 bg-purple-200',
      active: 'hover:!bg-purple-300 focus:ring focus:ring-purple-600 focus:ring-offset-2 focus:ring-offset-white'
    }
  }
};

interface Styles {
  size?: keyof typeof classes['size'];
  rounded?: keyof typeof classes['rounded'];
  variant?: keyof typeof classes['variant'];
  scheme?: keyof typeof classes['scheme'];
  active?: boolean;
  fullWidth?: boolean;
  className?: string;
}

type ButtonOrLinkProps = ComponentPropsWithRef<'button'> &
  ComponentPropsWithRef<'a'> &
  Styles;

export interface Props extends ButtonOrLinkProps {
  preserveRedirect?: boolean;
}

const ButtonOrLink = forwardRef<HTMLButtonElement & HTMLAnchorElement, Props>(
  ({ href, preserveRedirect, ...props }, ref) => {
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
  }
);

export default ButtonOrLink;
